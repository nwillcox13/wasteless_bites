import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "./Login";

function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Perform form submission logic here (e.g., API request)
      // Handle authentication and update application state accordingly
      console.log("Form submitted:", formData);
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.log("Form submission error:", error);
    }
  };

  return (
    <>
      <Button
        variant="custom"
        className="custom-button"
        style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
        onClick={openModal}
      >
        Login
      </Button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginButton;
