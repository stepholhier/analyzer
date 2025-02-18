import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOCSHEcRMuSC5Tp0Pz1KFQIRrszwecKFc",
  authDomain: "analyze-goodds.firebaseapp.com",
  projectId: "analyze-goodds",
  storageBucket: "analyze-goodds.firebasestorage.app",
  messagingSenderId: "281261798460",
  appId: "1:281261798460:web:b0400fcf212e1ad248bf39",
  measurementId: "G-ED1PJZ8KXC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
