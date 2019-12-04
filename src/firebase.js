import firebase from 'firebase/app'
import 'firebase/firestore'

//If you clone this repo, remember to switch out the info below with your own!
const firebaseConfig = firebase.initializeApp({
  apiKey: "add your info",
  authDomain: "add your info",
  databaseURL: "add your info",
  projectId: "add your info,
  storageBucket: "add your info",
  messagingSenderId: "add your info",
  appId: "add your info"
})

export { firebaseConfig as firebase }