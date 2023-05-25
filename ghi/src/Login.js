import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow mt-4">
          <div className="card-body">
            <h1 className="text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
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
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-block rounded-10"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
