import React, { useState, useEffect } from "react";
import { NavLink , useParams } from "react-router-dom";
import { Nav, Navbar, NavDropdown} from "react-bootstrap";
import logoImage from "./HiResTransparentLogo.png";
import LoginButton from "./LoginButton";
import LogoutForm from "./Logout";

function CustomNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const { itemId } = useParams();

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
    <Navbar expand="md" fixed="top" bg="light">
      <Navbar.Brand as={NavLink} to="/" onClick={closeNav}>
        <img
          src={logoImage}
          alt="Logo"
          width="90"
          height="100"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle onClick={toggleNav} />
      <Navbar.Collapse
        className={`justify-content-end ${isNavOpen ? "show" : ""}`}
      >
        <Nav>
          {authToken && (
            <>
              <Nav.Link
                as={NavLink}
                to="/items/new"
                onClick={closeNav}
                style={{ color: "#1E7016" }}
              >
                New item
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/items/list"
                onClick={closeNav}
                style={{ color: "#1E7016" }}
              >
                List Items
              </Nav.Link>
              <NavDropdown
                title="User"
                id="navbarDropdown"
                style={{ color: "#1E7016", background: "none", border: "none" }}
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/profile"
                  onClick={closeNav}
                  style={{ color: "#1E7016" }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to={`/user/items/${itemId}`}
                  onClick={closeNav}
                  style={{ color: "#1E7016" }}
                >
                  User Item Detail
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/user/items/list"
                  onClick={closeNav}
                  style={{ color: "#1E7016" }}
                >
                  User List Items
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <LogoutForm />
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {!authToken && <LoginButton />}
          <Nav.Link
            as={NavLink}
            to="/faq"
            onClick={closeNav}
            style={{ color: "#1E7016" }}
          >
            FAQ
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/chat"
            onClick={closeNav}
            style={{ color: "#1E7016" }}
          >
            Chat
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNav;
