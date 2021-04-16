import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCy2PqUYnrU3P-mYxyvpd6yiVns5JxLip8",
    authDomain: "flightpricetracker-9c83c.firebaseapp.com",
    projectId: "flightpricetracker-9c83c",
    storageBucket: "flightpricetracker-9c83c.appspot.com",
    messagingSenderId: "552790827931",
    appId: "1:552790827931:web:387eaab57bb87ec8e4b73e",
    measurementId: "G-JHWQJXHM81"
})
export const auth = app.auth()
export default app