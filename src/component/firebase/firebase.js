import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "************************",
  authDomain: "************************",
  projectId: "************************",
  storageBucket: "************************",
  messagingSenderId: "************************",
  appId: "************************",
  measurementId: "************************"
  };

  export default firebase.initializeApp(firebaseConfig);
