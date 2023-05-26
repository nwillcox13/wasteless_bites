import React, { useState } from "react";
import Button from "react-bootstrap/Button";
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
      <Button variant="primary" onClick={openModal}>
        Login
      </Button>
      <LoginForm showModal={showModal} closeModal={closeModal} />
    </>
  );
}

export default LoginButton;
