import {initializeApp} from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
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
const app = initializeApp(firebaseConfig);
const googleprovider = new GoogleAuthProvider;// we use new as we might need different providers for different forms of log-in.

googleprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();//dont use new keyword, as we only use 1 auth for the application
export const signInWithGooglePopup = () => signInWithPopup(auth,googleprovider)
export const db = getFirestore();
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleprovider);

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db,'users',userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  console.log("user Snapshot", userSnapShot);
  if(!userSnapShot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error){
      console.log("Error creating the user: ",error.message);
    }
  }
  return userDocRef;
}

//function to create an auth user
export const createAuthUserFromEmailandPassword = async (email, password) => {
  if(!email || !password) return; //protecting code

  return await createAuthUserFromEmailandPassword(auth,email,password);
};