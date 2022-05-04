import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"


function SignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

async function registerUser(event){
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/register', {
        
        method: 'POST',
        headers:{
           'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
    const data = await response.json()
    if(data.status === 'ok'){
      window.location.href = '/login'
    }
}


  return (
    <div className="Signup">
      <div className="">
        <h1 className="center">Sign Up</h1>
        <Container className="glass login-container center">
          <Form method="post" onSubmit = {registerUser}>
            <Form.Group>
              <Form.Control
                className="glass"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control
                className="glass"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="glass"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Check type="checkbox" label="Remember me next time" />
              <Button variant="dark" className="w-100 login " type="submit">
                Create Account
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;
