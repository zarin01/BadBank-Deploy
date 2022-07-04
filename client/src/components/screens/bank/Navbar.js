import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  let history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const Email = JSON.parse(window.localStorage.getItem("user"));
  const UserEmail = Email.email;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Bad Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/deposit">Deposit</Nav.Link>
            <Nav.Link href="#/withdraw">Withdraw</Nav.Link>
            <Nav.Link href="#/balance">Balance</Nav.Link>
            <Nav.Link href="#/data">Account Info</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              Hello: <u>{UserEmail}</u>
            </Nav.Link>
            <button onClick={logoutHandler} className="btn btn-secondary">
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
