import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountList from "./AccountList";
import React from "react";
import LoginForm from "./Login";
import Profile from "./Profile";
import SignUpForm from "./Signup";
// import { RequireToken } from "./Auth";

function App() {
  // console.log("HELLO WORLD");
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="Signup">
            <Route path="" element={<SignUpForm />} />
          </Route>
          <Route path="Login">
            <Route path="" element={<LoginForm />} />
          </Route>

          <Route path="/accounts" element={<AccountList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
