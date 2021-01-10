import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./header.scss";
import { logout } from '../../actions/auth.actions'

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

 const signOut = () => {
    dispatch(logout())
 }
  const renderLoggedInLinks = () => {
    return (
      <Nav className="link" onClick={signOut}>
        Sign Out
      </Nav>
    )
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav className="d-flex justify-content-end">
        <NavLink to="/signin" className="nav-link">SignIn</NavLink>
        <NavLink to="/signup" className="nav-link">SignUp</NavLink>
      </Nav>
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <Container fluid={true}>
        <Link to="/"><Navbar.Brand>Admin Dashboard</Navbar.Brand></Link>

        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Container>
    </Navbar>
  );
}

export default Header;
