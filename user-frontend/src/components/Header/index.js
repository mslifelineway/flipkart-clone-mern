import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./index.scss";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <Container className="navbar-container">
        <Link to="/">
          <Navbar.Brand>Home Page</Navbar.Brand>
        </Link>
        <Nav className="d-flex justify-content-end">
          <NavLink to="/signin" className="nav-link">
            SignIn
          </NavLink>
          <NavLink to="/signup" className="nav-link">
            SignUp
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
