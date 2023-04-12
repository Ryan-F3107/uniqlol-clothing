import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

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
const provider = new GoogleAuthProvider;// we use new as we might need different providers for different forms of log-in.

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();//dont use new keyword, as we only use 1 auth for the application
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)