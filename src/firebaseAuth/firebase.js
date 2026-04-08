import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCZDD_QAYLpPsaWpejHmUaYFBhwabTxaDk",
//   authDomain: "hrmapp-cd2f9.firebaseapp.com",
//   projectId: "hrmapp-cd2f9",
//   storageBucket: "hrmapp-cd2f9.firebasestorage.app",
//   messagingSenderId: "429496482726",
//   appId: "1:429496482726:web:76802fc6e13fbabf4eed67",
//   measurementId: "G-R7XYMJNCVR",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCZDD_QAYLpPsaWpejHmUaYFBhwabTxaDk",
  authDomain: "hrmapp-cd2f9.firebaseapp.com",
  projectId: "hrmapp-cd2f9",
  storageBucket: "hrmapp-cd2f9.firebasestorage.app",
  messagingSenderId: "429496482726",
  appId: "1:429496482726:web:5a5ecdd38491f5ef4eed67",
  measurementId: "G-G09H6V7H9M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
