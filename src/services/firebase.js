
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJKnL55jlTQT3-gX1UwJe04FXP-ZFbtsE",
  authDomain: "recipe-hyscaler-debasish.firebaseapp.com",
  projectId: "recipe-hyscaler-debasish",
  storageBucket: "recipe-hyscaler-debasish.firebasestorage.app",
  messagingSenderId: "165917370702",
  appId: "1:165917370702:web:6dd059ae7fec53b6a7961f",
  measurementId: "G-X9WHR124PY"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);