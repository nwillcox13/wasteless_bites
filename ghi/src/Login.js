import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = {
      email: email,
      password: password,
    };
    const url = "http://localhost:8000/token";
    const config = {
      method: "post",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, config)
      .then((response) => response.json())
      .then(() => {
        setSuccessAlert(true);
        const alertTimeout = setTimeout(() => {
          setSuccessAlert(false);
        }, 3000);
        const navigateTime = setTimeout(() => {
          navigate("/accounts");
        }, 1000);
        return () => {
          clearTimeout(alertTimeout);
          clearTimeout(navigateTime);
        };
      });
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
        background: "linear-gradient(to bottom, #32CD32, #006400)",
      }}
    >
      {successAlert && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
            color: "white",
            backgroundColor: "green",
            borderColor: "darkgreen",
            border: "1px solid",
            borderRadius: "5px",
            padding: "0.75rem 1.25rem",
          }}
        >
          Logged in!
        </div>
      )}
      <div
        style={{
          maxWidth: "25rem",
          width: "100%",
          padding: "2.5rem",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form
          style={{ marginTop: "2rem" }}
          onSubmit={handleSubmit}
          id="sign-up-form"
        >
          <div
            style={{
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: "#fff",
                  backgroundClip: "padding-box",
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
                placeholder="Email address"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: "#fff",
                  backgroundClip: "padding-box",
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                color: "#fff",
                backgroundColor: "#4F46E5",
                border: "1px solid transparent",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
