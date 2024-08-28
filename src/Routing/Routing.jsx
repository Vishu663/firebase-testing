import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../components/sign-in/sign-in";
import SignUp from "../components/sign-up/sign-up";
import Test from "../components/test/test";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Test />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}
