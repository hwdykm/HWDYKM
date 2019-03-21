import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAVvZQ9AcODCM24mwKqXhRxxWq2xyWkA4Q",
  authDomain: "how-well-do-you-know-me-aa191.firebaseapp.com",
  databaseURL: "https://how-well-do-you-know-me-aa191.firebaseio.com",
  projectId: "how-well-do-you-know-me-aa191",
  storageBucket: "how-well-do-you-know-me-aa191.appspot.com",
  messagingSenderId: "451978634728"
};

firebase.initializeApp(config);

const db = firebase.firestore();
export default db;
