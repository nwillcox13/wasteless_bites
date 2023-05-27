import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImage from "./HiResTransparentLogo.png";
import LoginButton from "./LoginButton";

function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar fixed-top bg">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand"
            aria-current="page"
            to=""
            onClick={closeNav}
          >
            <img
              src={logoImage}
              alt="Logo"
              width="90"
              height="100"
              className="d-inline-block align-top"
            />
          </NavLink>
          <button
            className={`navbar-toggler ${isNavOpen ? "" : "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded={isNavOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarCollapse"
          >
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="items/new"
                  onClick={closeNav}
                >
                  New item
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="items/list"
                  onClick={closeNav}
                >
                  List Items
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="login"
                  onClick={closeNav}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="signup"
                  onClick={closeNav}
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/faq"
                  onClick={closeNav}
                >
                  FAQ
                </NavLink>
              </li>
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/logout"
                onClick={closeNav}
              >
                Logout
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
