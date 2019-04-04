import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCjoChnlzEDOt2eeoXSGdZqrXdsnRrAC7Y",
    authDomain: "mystorage-cd584.firebaseapp.com",
    databaseURL: "https://mystorage-cd584.firebaseio.com",
    projectId: "mystorage-cd584",
    storageBucket: "mystorage-cd584.appspot.com",
    messagingSenderId: "919282323349"
  };

  const MyStore = firebase.initializeApp(config);

  export default MyStore;