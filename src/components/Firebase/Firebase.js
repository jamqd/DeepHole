import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyD7vbX_dhoVAHODMIDBGwT5-pjCqMhvV6A",
    authDomain: "deephole-fed23.firebaseapp.com",
    databaseURL: "https://deephole-fed23.firebaseio.com",
    projectId: "deephole-fed23",
    storageBucket: "deephole-fed23.appspot.com",
    messagingSenderId: "961452994389"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }
}

export default Firebase;
