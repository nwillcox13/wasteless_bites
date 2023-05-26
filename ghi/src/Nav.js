import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImage from "./HiResTransparentLogo.png";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignupButton";

function Nav() {
const [isNavOpen, setIsNavOpen] = useState(false);

const toggleNav = () => {
setIsNavOpen(!isNavOpen);
};

const closeNav = () => {
setIsNavOpen(false);
};

return (
<nav className="navbar navbar-expand-md navbar-fixed-top bg">
<div className="container-fluid">
    <NavLink className="navbar-brand" to="" onClick={closeNav}>
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
    type="button custom-button"
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
    <ul className="navbar-nav me-auto">
        <li className="nav-item">
        <NavLink
            className="nav-link custom-button"
            to="items/new"
            onClick={closeNav}
        >
            New item
        </NavLink>
        </li>
        <li className="nav-item">
        <NavLink
            className="nav-link custom-button"
            to="items/list"
            onClick={closeNav}
        >
            List Items
        </NavLink>
        </li>
        <li className="nav-item">
        <NavLink
            className="nav-link custom-button"
            to="/faq"
            onClick={closeNav}
        >
            FAQ
        </NavLink>
        </li>
    </ul>
    <div className="d-md-flex align-items-center">
        <div className="my-2 my-md-0">
        <LoginButton className="my-custom-button" />
        </div>
        <div className="my-2 my-md-0">
        <SignUpButton className="my-custom-button" />
        </div>
    </div>
    </div>
</div>
</nav>
);
}

export default Nav;
