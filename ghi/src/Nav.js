import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoImage from "./HiResTransparentLogo.png";

function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);

    const updateAuthToken = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", updateAuthToken);

    const onLogin = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("login", onLogin);

    const onLogout = () => {
      setAuthToken(null);
    };
    window.addEventListener("logout", onLogout);

    return () => {
      window.removeEventListener("storage", updateAuthToken);
      window.removeEventListener("login", onLogin);
      window.removeEventListener("logout", onLogout);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-md navbar fixed-top bg">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          aria-current="page"
          to="/"
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
            {authToken ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/items/new"
                    onClick={closeNav}
                  >
                    New item
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/items/list"
                    onClick={closeNav}
                  >
                    List Items
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    User
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/profile"
                        onClick={closeNav}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/useritemdetail"
                        onClick={closeNav}
                      >
                        User Item Detail
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/user/items/list"
                        onClick={closeNav}
                      >
                        User List Items
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/logout"
                        onClick={closeNav}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/login"
                    onClick={closeNav}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/signup"
                    onClick={closeNav}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
