import Rebase from 're-base'
import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8oFagommLnfQHeoL8kefSd-Ng0btBO-Y",
    authDomain: "flymenus.firebaseapp.com",
    databaseURL: "https://flymenus.firebaseio.com",
    projectId: "flymenus",
    storageBucket: "flymenus.appspot.com",
    messagingSenderId: "785466280841"
});


const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export {app, base, facebookProvider}