import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountList from "./AccountList";
import React from "react";
import Login from "./Login";
import Profile from "./Profile";
import { RequireToken } from "./Auth";

function App() {
  console.log("HELLO WORLD");
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/profile"
            element={
              <RequireToken>
                <Profile />
              </RequireToken>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
