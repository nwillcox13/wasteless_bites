import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   if (email.trim() === "" || password.trim() === "") {
  //     setError("Please enter both email and password.");
  //     return;
  //   }
  //   // Perform login logic here (e.g., API request to FastAPI backend)
  //   // Handle authentication and update application state accordingly
  //   // You can display error messages on failure or redirect on success
  //   setEmail("");
  //   setPassword("");
  //   setError("");
  //   // Close the login modal after successful login
  // setShowLogin(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/accounts/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Authentication successful:", data);
          const { access_token } = data;
          localStorage.setItem("authToken", access_token);
          const event = new Event("login");
          window.dispatchEvent(event);

          setEmail("");
          setPassword("");
          const navigateTime = setTimeout(() => {
            navigate("/");
          }, 1000);
          return () => {
            clearTimeout(navigateTime);
          };
        } else {
          console.log("Authentication failed");
          const data = await response.json();
          console.error(data.detail);
          setError(data.detail || "Authentication failed");
        }
      } catch (error) {
        console.log("Error occurred:", error);
      }
    } else {
      console.log("Please fill in all the fields.");
    }
  };

  return (
    <>
      <Button
        variant="custom"
        className="custom-button"
        style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
        onClick={() => setShowLogin(true)}
      >
        Login
      </Button>

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            {error && <div className="text-danger">{error}</div>}

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginForm;
