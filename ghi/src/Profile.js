import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const fetchUserData = async () => {
    const url = "http://localhost:8000/api/accounts/me";
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.ok) {
      const data = await response.json();
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
    } else {
      setUpdateError("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedAccount = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    const url = "http://localhost:8000/api/accounts/me";
    const config = {
      method: "PUT",
      body: JSON.stringify(updatedAccount),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await fetch(url, config);
    if (response.ok) {
      setUpdateSuccess(true);
      setUpdateError("");
    } else {
      setUpdateError("Error updating profile");
      setUpdateSuccess(false);
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setUpdateError("Passwords do not match");
      setUpdateSuccess(false);
      return;
    }

    const updatedAccount = {
      password: password,
    };

    const url = "http://localhost:8000/api/accounts/me";
    const config = {
      method: "PUT",
      body: JSON.stringify(updatedAccount),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await fetch(url, config);
    if (response.ok) {
      setUpdateSuccess(true);
      setUpdateError("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setUpdateError("Error updating password");
      setUpdateSuccess(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow mt-4">
          <div className="card-body">
            <h1>Update Profile</h1>
            {updateSuccess && (
              <div className="alert alert-success">
                Profile updated successfully!
              </div>
            )}
            {updateError && (
              <div className="alert alert-danger">{updateError}</div>
            )}
            <form onSubmit={handleSubmit}>
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
                  onChange={(event) => setFirstName(event.target.value)}
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
                  onChange={(event) => setLastName(event.target.value)}
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
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary custom-button"
                  style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
                >
                  Update Profile
                </button>
              </div>
            </form>
            <hr />
            <h2>Update Password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary custom-button"
                  style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
