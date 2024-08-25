import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
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

export default function SignIn() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://fir-testing-b8a93-default-rtdb.firebaseio.com/Users.json"
      );
      const data = await response.json();

      if (data) {
        const users = Object.values(data);
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          alert("Login Successful");
          console.log("login works");
          navigate("/");
        } else {
          setErrorMessage("Invalid email or password");
        }
      } else {
        setErrorMessage("No users found");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setErrorMessage("Error signing in");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      console.log("Google Sign-In successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setErrorMessage("Error signing in with Google");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>

      <div>
        <p>Or sign in with:</p>
        <button onClick={handleGoogleSignIn}>Google</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
