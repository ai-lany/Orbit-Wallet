import "../../App.css";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import Star from '../../assets/star.svg'

function Header(props) {
  return (
    <Navbar id = "navbar" bg="transparent" variant="dark" expand="lg">
      <Navbar.Brand href="/"><img style={{height: "1.8em", padding: "0 0 .2em"}} src = {Star}></img>Orbit</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Search/>
          <div className="login-buttons">
          <Nav.Link href="/login">LogIn</Nav.Link>
          <Nav.Link className="signup-nav"href="/signup">SignUp</Nav.Link>
          </div>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
