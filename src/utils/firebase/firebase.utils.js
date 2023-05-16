import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, //allows us to get a collection reference
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjiZTLn3NXYG_oO57XXPvhI-3cOf0Mc9o",
  authDomain: "uniqlol-clothing.firebaseapp.com",
  projectId: "uniqlol-clothing",
  storageBucket: "uniqlol-clothing.appspot.com",
  messagingSenderId: "112188256856",
  appId: "1:112188256856:web:d458f1fcc3e84c1c44502d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleprovider = new GoogleAuthProvider();// we use new as we might need different providers for different forms of log-in.

googleprovider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();//dont use new keyword, as we only use 1 auth for the application
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider)
export const db = getFirestore();

//functions is called and the categories are provided -- to insert into Firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);//set the batch with the document Reference and object
  });
  await batch.commit();
  console.log("done");
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef) // generate query of the collection
  const querySnapshot = await getDocs(q);
  //querySnapshot.docs// gives an array of documents and snapshot is the data itself
  //will be creating our JSON object from the documents - to place onto webpage
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
  return categoryMap;
}

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,//spread the remaining values from the additionalInformation object
      })
    } catch (error) {
      console.log("Error creating the user: ", error.message);
    }
  }
  return userDocRef;
};

//function to create an auth user
export const createAuthUserFromEmailandPassword = async (email, password) => {
  if (!email || !password) return; //protecting code
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserFromEmailandPassword = async (email, password) => {
  if (!email || !password) return; //protecting code
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);// since signOut is async, we get a promise
// Remember: auth is a singleton class, it also keeps track of which user is signed in.
export const onAuthStateChangedHandler = (callback) => {
  onAuthStateChanged(auth, callback);// callback function is run as well
}