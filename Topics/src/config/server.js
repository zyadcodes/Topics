// This is going to export all named functions that are going to interact with the Cloud
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import imageToBase64 from 'react-native-image-base64';

// This function is going to take in some information about a user and is going to send their information
// up to Firebase Auth and store it in Firestore
const createUser = async (
  email,
  phoneNumber,
  formattedPhoneNumber,
  countryCode,
  password,
) => {
  try {
    // Creates the auth user
    const user = await auth().createUserWithEmailAndPassword(email, password);
    // Adds the user data (without password) to Firestore
    const userID = user.user.uid;
    await firestore().collection('Users').doc(userID).set({
      userID,
      email,
      formattedPhoneNumber,
      phoneNumber,
      countryCode,
      createdTopics: [],
      subscribedTopics: [],
    });

    await auth().signInWithEmailAndPassword(email, password);

    return 0;
  } catch (error) {
    if (
      error.message ===
      '[auth/email-already-in-use] The email address is already in use by another account.'
    ) {
      return 1;
    } else if (
      error.message ===
      '[auth/invalid-email] The email address is badly formatted.'
    ) {
      return 2;
    }
  }
};

// This function is going to update a user's information in the database by updating it in Auth as well as updating it
// in Cloud Firestore
const updateUserInfo = async (
  userID,
  oldEmail,
  newEmail,
  formattedPhoneNumber,
  phoneNumber,
  password,
) => {
  try {
    await auth().signInWithEmailAndPassword(oldEmail, password);
    await auth().currentUser.updateEmail(newEmail);
    await firestore()
      .collection('Users')
      .doc(userID)
      .update({email: newEmail, formattedPhoneNumber, phoneNumber});

    const userObject = (
      await firestore().collection('Users').doc(userID).get()
    ).data();
    return userObject;
  } catch (error) {
    if (
      error.message ===
      '[auth/email-already-in-use] The email address is already in use by another account.'
    ) {
      return 1;
    } else if (
      error.message ===
      '[auth/invalid-email] The email address is badly formatted.'
    ) {
      return 2;
    } else {
      return -1;
    }
  }
};

// This method is going to attempt to log the user into their account and return an error if incorrect info
const logIn = async (email, password) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password);

    return user.user.uid;
  } catch (error) {
    return -1;
  }
};

// This method is going to send a user password reset email for users that forgot their passwords
const resetPassword = async (email) => {
  await auth().sendPasswordResetEmail(email);

  return 0;
};

// This method is going to fetch a user object from firestore based on user id
const getUserByID = async (id) => {
  const user = await firestore().collection('Users').doc(id).get();

  if (!user.exists) {
    return -1;
  }

  return user.data();
};

// This method is going to take in topic information and upload it to both Firestore
// and Storage. It will use the topicID to link the storage with the Firestore together
const createTopic = async (
  topicName,
  topicDescription,
  topicCoverImage,
  topicProfileImage,
  tags,
  userID,
) => {
  // Creates the document topic
  const topic = await firestore().collection('Topics').add({
    topicName,
    topicDescription,
    userID,
    tags,
    subscribers: 0,
  });

  // Creates promises to speed up the process
  const firestorePromise = firestore()
    .collection('Users')
    .doc(userID)
    .update({
      createdTopics: firestore.FieldValue.arrayUnion(topic.id),
    });

  const topicIDPromise = topic.update({
    topicID: topic.id,
  });

  const storagePromiseCover = storage()
    .ref()
    .child('topicsCoverImages/' + topic.id)
    .putFile(topicCoverImage);
  const storagePromiseProfile = storage()
    .ref()
    .child('topicsProfileImages/' + topic.id)
    .putFile(topicProfileImage);

  await Promise.all([
    firestorePromise,
    topicIDPromise,
    storagePromiseCover,
    storagePromiseProfile,
  ]);

  return 0;
};

// This is going to fetch a topic by ID by getting the document as well as the profile images for the topic, combining
// them into one object, and returning it. If the topic doesn't exist, returns -1
const getTopicByID = async (topicID) => {
  // Constructs the promises
  const firestorePromise = firestore().collection('Topics').doc(topicID).get();
  const storageProfilePromise = storage()
    .ref()
    .child('topicsProfileImages/' + topicID)
    .getDownloadURL();
  const storageCoverPromise = storage()
    .ref()
    .child('topicsCoverImages/' + topicID)
    .getDownloadURL();

  try {
    const results = await Promise.all([
      firestorePromise,
      storageProfilePromise,
      storageCoverPromise,
    ]);

    // Converts the images to base64 for simpler front end processing
    const images = await Promise.all([
      imageToBase64.getBase64String(results[1]),
      imageToBase64.getBase64String(results[2]),
    ]);

    return {
      ...results[0].data(),
      profileImage: images[0],
      coverImage: images[1],
    };
  } catch (error) {
    if (
      error.message.includes(
        '[storage/object-not-found] No object exists at the desired reference.',
      )
    ) {
      return -1;
    } else {
    }
  }
};

// This method is going to send a message by adding it to the database of messages. It will then also deliver the message
// to everyone subscribed to that topic
const sendMessage = async (topicName, topicID, message) => {
  // Combines into one promise to make sure it is efficient
  await Promise.all([
    await functions().httpsCallable('sendMessage')({
      topicName,
      topicID,
      message,
    }),
    await firestore()
      .collection('Topics')
      .doc(topicID)
      .collection('Messages')
      .add(message),
  ]);
  return 0;
};

// This method is going to order topic 20 messages (limit) given a starting timestamp. The idea is to save loading time and
// reads by loading batched and loading messages as the user scrolls up
const loadTopicMessages = async (topicID, startTimestamp) => {
  // Creates the query
  const query = firestore()
    .collection('Topics')
    .doc(topicID)
    .collection('Messages')
    .where('createdAt', '<', startTimestamp)
    .orderBy('createdAt', 'desc')
    .limit(20);

  // Retrieves the query
  const queryResults = await query.get();

  // Maps the query to documents
  const finalArray = queryResults.docs
    .map((eachDoc) => eachDoc.data()) // Fetches the firestore data
    .map((eachDoc) => ({...eachDoc, createdAt: eachDoc.createdAt.toDate()})); // Maps firestore timestamp to JS date object

  return finalArray;
};

// This method is going to sign the current user out
const signOut = async () => {
  await auth().signOut();

  return 0;
};

// Exports all of the functions
export {
  createUser,
  updateUserInfo,
  logIn,
  resetPassword,
  getUserByID,
  createTopic,
  loadTopicMessages,
  getTopicByID,
  sendMessage,
  signOut,
};
