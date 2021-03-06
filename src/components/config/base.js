import Rebase from 're-base'
import firebase from 'firebase'

const app = firebase.initializeApp({
  /* apiKey: "AIzaSyA8oFagommLnfQHeoL8kefSd-Ng0btBO-Y",
    authDomain: "flymenus.firebaseapp.com",
    databaseURL: "https://flymenus.firebaseio.com",
    projectId: "flymenus",
    storageBucket: "flymenus.appspot.com",
    messagingSenderId: "785466280841" */
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});


const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export {app, base, facebookProvider}