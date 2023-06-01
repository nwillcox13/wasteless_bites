import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LogoutForm() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    const event = new Event("logout");
    window.dispatchEvent(event);
    navigate("/");
  };

  return (
    <Button
      variant="custom"
      className="custom-button"
      style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export default LogoutForm;
