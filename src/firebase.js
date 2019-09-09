import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAaTxsmPNOeAmpGZCCiZ7oO_DJ5SrPhMdI",
  authDomain: "doit-d2dcb.firebaseapp.com",
  databaseURL: "https://doit-d2dcb.firebaseio.com",
  projectId: "doit-d2dcb",
  storageBucket: "doit-d2dcb.appspot.com",
  messagingSenderId: "377138441514",
  appId: "1:377138441514:web:3000989d1e03e3c8"
})

export { firebaseConfig as firebase }