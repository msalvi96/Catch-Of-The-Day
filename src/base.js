import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCSyIpl-DX5wcG94HvddfgFmSE2w3BdLTg",
    authDomain: "catch-of-the-day-68e1c.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-68e1c.firebaseio.com",
    projectId: "catch-of-the-day-68e1c",
    storageBucket: "catch-of-the-day-68e1c.appspot.com",
    messagingSenderId: "896542265584",
    appId: "1:896542265584:web:ecc64c45bca6ed0def7235",
    measurementId: "G-L720TGMJZW"    
}

const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;