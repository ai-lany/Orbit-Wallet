import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Navbar, Nav, Form, NavDropdown, Button} from "react-bootstrap";
import TextField from "@mui/material/TextField";

function Header(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Orbit</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Form.Control type="text" placeholder="Search" />
          <div className="login-buttons">
          <Button variant="outline-dark login">Log In</Button>
          <Button variant="dark signup">Sign Up</Button>
          </div>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
