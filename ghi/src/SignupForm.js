import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    const newAccount = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    const url = "http://localhost:8000/api/accounts";
    const config = {
      method: "post",
      body: JSON.stringify(newAccount),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const loginData = {
        username: email,
        password: password,
      };

      const loginUrl = "http://localhost:8000/api/accounts/login";
      const loginConfig = {
        method: "post",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      };

      const loginResponse = await fetch(loginUrl, loginConfig);
      const loginJson = await loginResponse.json();
      console.log("Authentication successful:", loginJson);
      const { access_token } = loginJson;
      localStorage.setItem("authToken", access_token);
      navigate("/items/list");
    } catch (error) {
      console.error("Error creating account or logging in:", error);
      alert("An account with this email already exists");
    }
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow mt-4">
          <div className="card-body">
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit} id="sign-up-form">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="form-control"
                  placeholder="First name"
                  value={firstName}
                  onChange={handleFirstName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Last name"
                  value={lastName}
                  onChange={handleLastName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmail}
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
                  onChange={handlePassword}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary custom-button"
                  style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
