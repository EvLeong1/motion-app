import { initializeApp, getApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_APPID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID
  };

const app = initializeApp(firebaseConfig);

// firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

