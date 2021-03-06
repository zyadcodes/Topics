const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initializes the Firebase admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// This message is going to send messages to everyone in subscribed to a specified topic
exports.sendMessage = functions.https.onCall(async (data, context) => {
  const {topicSubname, topicID, message} = data;

  await admin.messaging().sendToTopic('/topics/' + topicID, {
    notification: {
      title: topicSubname,
      body: 'Open the app to see now!',
    },
  });
});
