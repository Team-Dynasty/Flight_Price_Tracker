import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBMjkRN0U7KnGuQJwp6KK4ttx0jFyfxnq0",
    authDomain: "flightpricetracker-d3b86.firebaseapp.com",
    projectId: "flightpricetracker-d3b86",
    storageBucket: "flightpricetracker-d3b86.appspot.com",
    messagingSenderId: "577323088779",
    appId: "1:577323088779:web:e63923c3e0cac7d0264d8e"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;