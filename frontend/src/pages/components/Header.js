import "../../App.css";
import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import Star from '../../assets/star.svg'
import jwtDecode from 'jwt-decode'

function Header(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState();

  useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = jwtDecode(token);
			if (!user) {
				localStorage.removeItem('token');
				setAuth(false);
			} else {
				setAuth(true);
			}
		}
	}, [])

  if(!auth){
    return (
      <Navbar style={{height:"fit-content"}} id = "navbar" bg="transparent" variant="dark" expand="lg">
        <Navbar.Brand href="/"><img style={{height: "1.8em", padding: "0 0 .2em"}} src = {Star}></img>Orbit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>

            <div className="login-buttons">
            <Nav.Link href="/login">LogIn</Nav.Link>
            <Nav.Link className="signup-nav"href="/signup">SignUp</Nav.Link>
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }else{

    function handleLogout(){
      localStorage.removeItem('token');
      setAuth(false);
    }

    return(
      <Navbar style={{height:"fit-content"}} id = "navbar" bg="transparent" variant="dark" expand="lg">
        <Navbar.Brand href="/dashboard"><img style={{height: "1.8em", padding: "0 0 .2em"}} src = {Star}></img>Orbit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">

            <Nav.Link onClick={handleLogout} style={{position: "absolute", right: "0", top: "0"}} href="/">Log Out</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  
}

export default Header;
