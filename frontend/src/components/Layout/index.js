import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./layout.scss";

function Layout(props) {
  const activeNav = props.activeNav;
  const active = "activeSidebarNav"; //this is used in css to apply css
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid={true}>
          <Row>
            <Col lg={2} md={2} className="sidebar">
              <Nav className="sidebar-nav">
                <NavLink
                  to="/"
                  exact
                  className={`nav-link ${activeNav === "Home" ? active : ""}`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/categories"
                  className={`nav-link ${
                    activeNav === "Categories" ? active : ""
                  }`}
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/products"
                  className={`nav-link ${
                    activeNav === "Products" ? active : ""
                  }`}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/orders"
                  className={`nav-link ${activeNav === "Orders" ? active : ""}`}
                >
                  Orders
                </NavLink>
              </Nav>
            </Col>
            <Col lg={10} md={10} className="main-container">
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}

export default Layout;
