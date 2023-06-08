import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import LoginForm from "./Login";

function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Nav.Link
        onClick={openModal}
        className="login-button" // Add a custom class name
        style={{ color: "#1E7016" }} // Inline CSS
      >
        Login
      </Nav.Link>
      {showModal && <LoginForm showModal={showModal} closeModal={closeModal} />}
    </>
  );
}

export default LoginButton;
