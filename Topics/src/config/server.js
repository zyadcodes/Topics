// This is going to export all named functions that are going to interact with the Cloud
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
    });

    await auth().signInWithEmailAndPassword(email, password);

    return 0;
  } catch (error) {
    if (
      error.message ===
      '[auth/email-already-in-use] The email address is already in use by another account.'
    ) {
      return 1;
    }
  }
};

// This method is going to sign the current user out
const signOut = async () => {
  await auth().signOut();

  return 0;
};

// Exports all of the functions
export {createUser, signOut};
