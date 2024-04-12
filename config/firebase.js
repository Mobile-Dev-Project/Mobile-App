// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnBCfQYwJ3UpXTbPuCAZ80ObcvSUib53s",
  authDomain: "mobile-dev-project-26bb4.firebaseapp.com",
  databaseURL: "https://mobile-dev-project-26bb4-default-rtdb.firebaseio.com",
  projectId: "mobile-dev-project-26bb4",
  storageBucket: "mobile-dev-project-26bb4.appspot.com",
  messagingSenderId: "298818858004",
  appId: "1:298818858004:web:1df4096b7e95b0721c4b01",
  measurementId: "G-7RH9637K3R",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with Persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
