import firebase from 'firebase'

const config={
    apiKey: "AIzaSyA8vKD-9TxP224khAUZI3wnGZW7Qge5ubk",
    authDomain: "bloodybank-app.firebaseapp.com",
    databaseURL: "https://bloodybank-app.firebaseio.com",
    projectId: "bloodybank-app",
    storageBucket: "bloodybank-app.appspot.com",
    messagingSenderId: "734137709955"

};

export const fire=firebase.initializeApp(config);
export const db=firebase.database();