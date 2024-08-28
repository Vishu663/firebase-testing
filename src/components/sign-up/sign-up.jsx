import "./sign-up.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

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

export default function SignUp() {
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
        "https://fir-testing-b8a93-default-rtdb.firebaseio.com/Users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (response.ok) {
        alert("Registration Successful");
        navigate("/signin"); // Redirect to home or another page
      } else {
        setErrorMessage("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Error registering");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Optionally, you can store additional user data in your database
      const userData = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };

      await fetch(
        "https://fir-testing-b8a93-default-rtdb.firebaseio.com/Users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      alert(`Welcome, ${user.displayName}`);
      console.log("Google Sign-Up successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      setErrorMessage("Error signing up with Google");
    }
  };

  const handleMember = () => {
    navigate("/signin");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>

      <div>
        <p>Or sign up with:</p>
        <button className="google" onClick={handleGoogleSignUp}>
          Google
          <FcGoogle />
        </button>
      </div>

      <div>
        <p>Already a member?</p>
        <button onClick={handleMember}>Sign In</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
