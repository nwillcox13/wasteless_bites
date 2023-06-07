import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav} from "react-bootstrap";

function LogoutForm() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    const event = new Event("logout");
    window.dispatchEvent(event);
    navigate("/");
  };

  return <Nav.Link onClick={handleLogout}>Logout</Nav.Link>;
}

export default LogoutForm;
