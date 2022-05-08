import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyARCF8R1dYIH4-POQD6wd26RfaihOPiQ4s",
  authDomain: "disney-clone-data.firebaseapp.com",
  projectId: "disney-clone-data",
  storageBucket: "disney-clone-data.appspot.com",
  messagingSenderId: "190633554272",
  appId: "1:190633554272:web:abfc96680ddae034452e05"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
