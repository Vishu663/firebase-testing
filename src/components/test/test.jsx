import { useNavigate } from "react-router-dom";

export default function Test() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };
  return (
    <>
      <div>Welcome to the page</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
