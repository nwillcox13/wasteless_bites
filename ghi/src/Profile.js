import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
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
      setLocation(data.location);
    } else {
      setUpdateError("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setUpdateError("Passwords do not match");
      setUpdateSuccess(false);
      return;
    }

    let updatedAccount = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      location: location,
    };

    if (password && confirmPassword) {
      updatedAccount.password = password;
    }

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
      setUpdateError("Error updating profile");
      setUpdateSuccess(false);
    }
  };

  const handleDelete = async () => {
    const url = "http://localhost:8000/api/accounts/me";
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await fetch(url, config);
    if (response.ok) {
      navigate("/login");
    } else {
      setUpdateError("Error deleting account");
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
                  className="form-control"
                  placeholder="First Name"
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
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="int"
                  className="form-control"
                  placeholder="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>

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
                  required
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
                  required
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
                <button
                  type="button"
                  className="btn btn-danger custom-button"
                  style={{ marginLeft: "10px" }}
                  onClick={handleDelete}
                >
                  Delete Account
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
