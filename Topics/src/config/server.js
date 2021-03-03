// This is going to export all named functions that are going to interact with the Cloud
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import Motivation from '../assets/topicPics/Motivation.png';

// Maps out the images of the topics to the
// correct topic
const profileImages = {
  's09Q8VmrmtM1v84YfgJ8': Motivation
};

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
      followingTopics: [],
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
const createTopic = async (topicName, userID) => {
  // Creates the document topic
  const topic = await firestore().collection('Topics').add({
    topicName,
    userID,
    followers: 0,
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

  await Promise.all([firestorePromise, topicIDPromise]);

  return 0;
};

// This method is going to update a topic's information in the database
// This method is going to take in topic information and upload it to both Firestore
// and Storage. It will use the topicID to link the storage with the Firestore together
const saveTopic = async (topicName, topicID) => {
  // Creates the document topic
  const topicPromise = await firebase
    .firestore()
    .collection('Topics')
    .doc(topicID)
    .update({
      topicName,
    });

  return 0;
};

// This is going to fetch a topic by ID by getting the document
const getTopicByID = async (topicID) => {
  // Constructs the promises
  const firestorePromise = await firestore()
    .collection('Topics')
    .doc(topicID)
    .get();

  if (!firestorePromise.exists) {
    return -1;
  }

  // Fetches the image for the topic as well
  return {
    ...firestorePromise.data(),
    profileImage: profileImages[firestorePromise.data().topicID],
  };
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

// This method is going to get all of the topics in the collection
const getAllTopics = async () => {
  const allTopics = await firestore().collection('Topics').get();

  return allTopics.docs.map((eachTopic) => {
    return {
      ...eachTopic.data(),
      profileImage: profileImages[eachTopic.data().topicID],
    };
  });
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
  saveTopic,
  resetPassword,
  getUserByID,
  createTopic,
  loadTopicMessages,
  getAllTopics,
  getTopicByID,
  sendMessage,
  signOut,
};
