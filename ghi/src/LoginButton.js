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
    >
      Login
    </Nav.Link>
    {showModal && <LoginForm showModal={showModal} closeModal={closeModal} />}
  </>
);
}

export default LoginButton;
