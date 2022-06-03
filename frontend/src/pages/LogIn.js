import "../App.css";
import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function loginUser(event){
    event.preventDefault();
    const response = await fetch('https://orbit-wallet.herokuapp.com/api/login', {
        
        method: 'POST',
        headers:{
           'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()
    console.log(data);

		if (data.user) {
			localStorage.setItem('token', data.user)
			console.log('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
}


  return (
    <div className="Login">
      <div className="">
        <h1 className="center">Log In</h1>
        <Container className="glass login-container center">
          <Form onSubmit={loginUser}>
            <Form.Group>
              <Form.Control
                className="glass"
                type="email"
                placeholder="Email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}

              />
              <Form.Control
                className="glass"
                type="password"
                placeholder="Password"
                value={password}
                onChange = {(e) => setPassword(e.target.value)}

              />
              <Form.Check type="checkbox" label="Remember me next time" />
              <Button variant="dark" className="w-100 login " type="submit">
                Sign In
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Login;
