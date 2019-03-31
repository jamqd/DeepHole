import firebase from 'firebase';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyD7vbX_dhoVAHODMIDBGwT5-pjCqMhvV6A",
    authDomain: "deephole-fed23.firebaseapp.com",
    databaseURL: "https://deephole-fed23.firebaseio.com",
    projectId: "deephole-fed23",
    storageBucket: "deephole-fed23.appspot.com",
    messagingSenderId: "961452994389"
};

firebase.initializeApp(config);

export default firebase;
