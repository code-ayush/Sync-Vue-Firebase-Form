import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC61W1_neOBfjNBs1i1F8eyoy6R4aes2yY",
    authDomain: "syncformdb.firebaseapp.com",
    databaseURL: "https://syncformdb.firebaseio.com",
    projectId: "syncformdb",
    storageBucket: "syncformdb.appspot.com",
    messagingSenderId: "328583357596",
    appId: "1:328583357596:web:bc9dc08554219ec920f959",
    measurementId: "G-1JNMKMB8J9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();