import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Button, Form } from "react-bootstrap";

function Login(props) {
  return (
    <div className="">
      <div className="">
        <h1 className="center">Log In</h1>
        <Container className="login-container center">
          <Form method="post">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
              />
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
              <Form.Check type="checkbox" label="Remember me next time" />
              <Button variant="dark" className="login " type="submit">
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
