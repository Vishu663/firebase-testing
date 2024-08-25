import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL5B-62cAAk0Ak-3scmJpkXy_x9Exmro8",
  authDomain: "fir-testing-b8a93.firebaseapp.com",
  projectId: "fir-testing-b8a93",
  storageBucket: "fir-testing-b8a93.appspot.com",
  messagingSenderId: "387060321840",
  appId: "1:387060321840:web:7f1c8e0251c55aede767f5",
  measurementId: "G-EEGHBNFPD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
