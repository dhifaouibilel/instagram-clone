import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBjzXfw3M7RGY2K0wQkbsdni0NY5DApUkE",
  authDomain: "instagram-clone-mern-app.firebaseapp.com",
  databaseURL: "https://instagram-clone-mern-app.firebaseio.com",
  projectId: "instagram-clone-mern-app",
  storageBucket: "instagram-clone-mern-app.appspot.com",
  messagingSenderId: "170106957083",
  appId: "1:170106957083:web:cdc8371bd87f4d4036b7be"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
