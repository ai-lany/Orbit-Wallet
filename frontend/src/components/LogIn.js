import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Button, Form } from "react-bootstrap";

function Login(props) {
  return (
    <div className="Login">
      <div className="">
        <h1 className="center">Log In</h1>
        <Container className="glass login-container center">
          <Form method="post">
            <Form.Group>
              <Form.Control
                className="glass"
                type="text"
                placeholder="Username"
                name="username"
              />
              <Form.Control
                className="glass"
                type="password"
                placeholder="Password"
                name="password"
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
