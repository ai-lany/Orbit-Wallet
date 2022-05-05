import "../../App.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import Star from "../../assets/star.svg";
import jwtDecode from "jwt-decode";

function Header(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({})
  const [toggle, setToggle] = useState('');


  function toggleNav(){
    if(toggle == 'd-none'){
      setToggle(' ')
    }else{
      setToggle('d-none')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        setAuth(false);
      } else {
        setAuth(true);
        setUser(user);
      }
    }
    setToggle('d-none');

  }, []);

  if (!auth) {
    return (
      <Navbar
        style={{ height: "fit-content" }}
        id="navbar"
        bg="transparent"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand href="/" style={{ position: "relative", top: ".2em"}}>
          <img
            style={{ height: "2em", padding: "0 0 .3em" }}
            src={Star}
          ></img>
          Orbit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={toggleNav}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>

            <div className="login-buttons">
              <Nav.Link href="/login">LogIn</Nav.Link>
              <Nav.Link className="signup-nav" href="/signup">
                SignUp
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <div style ={{position: "absolute" , top: "0", height:"100vh", width: "100vw"}} className={"bg-blur " + toggle}>
.
        </div>
      </Navbar>
    );
  } else {
    function handleLogout() {
      localStorage.removeItem("token");
      navigate.replace("/");
      setAuth(false);
    }

  

    return (
      <Navbar
        style={{ height: "fit-content" }}
        id="navbar"
        bg="transparent"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand href="/dashboard">
          <img
            style={{ height: "2em", padding: "0 0 .3em" }}
            src={Star}>
          </img>
          Orbit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNav}  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ position: "absolute", right: "0", top: "0"}} className="">
            <div style={{lineHeight: "3.6em", padding: "0 1em", display: "flex"}} className="btn user-menu text-light">
              <div className="my-auto mx-2 d-inline-flex bg-black circle"  style={{ height: "30px", width: "30px", borderRadius: "30px", overflow: "hidden"}}>
                <PersonFill height={60} width={30} style={{position: "relative", bottom: "1em"}}/>
              </div>
              
              {user.firstName}
              
              </div>
            <Nav.Link
              onClick={handleLogout}
              href="/">
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
