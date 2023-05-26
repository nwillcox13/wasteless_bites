import React, { useState } from "react";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }
    // Perform login logic here (e.g., API request to FastAPI backend)
    // Handle authentication and update application state accordingly
    // You can display error messages on failure or redirect on success
    setEmail("");
    setPassword("");
    setError("");
    // Call the onSubmit callback with the form data
    onSubmit({ email, password });
  };

  return (
    <div className="text-center">
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-block rounded-10 custom-button">
          Login
        </button>
      </div>
    </form>
</div>
  );
}

export default LoginForm;
