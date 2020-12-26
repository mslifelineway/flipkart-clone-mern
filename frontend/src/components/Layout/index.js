import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./layout.css";

function Layout(props) {
  return (
    <>
      <Header />
      {
        props.sidebar ? <Container fluid={true}>
          <Row>
            <Col lg={2} md={2} className="sidebar">
              <Nav className="sidebar-nav">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/categories" className="nav-link">Categories</NavLink>
                <NavLink to="/products" className="nav-link">Products</NavLink>
                <NavLink to="/orders" className="nav-link">Orders</NavLink>
              </Nav>
            </Col>
            <Col lg={10} md={10} className="main-container">
              {props.children}
            </Col>
          </Row>
        </Container>
          : props.children
      }

    </>
  );
}

export default Layout;
