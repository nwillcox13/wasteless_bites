import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutForm() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    const event = new Event("logout");
    window.dispatchEvent(event);
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutForm;
