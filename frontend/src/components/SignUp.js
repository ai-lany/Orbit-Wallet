import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Button, Form } from "react-bootstrap";

function SignUp(props) {
  return (
    <div className="Signup">
      <div className="">
        <h1 className="center">Sign Up</h1>
        <Container className="glass login-container center">
          <form method="post">
            <div className="form-group">
              <input
                name="username"
                type="text"
                className=" glass form-control"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className=" glass form-control"
                placeholder="example@orbit.com"
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className=" glass form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create Account"
                className="w-100 btn btn-dark btn-block"
              />
            </div>
            Already have an account?{" "}
            <a href="/login" className="btn">
              Log In
            </a>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;
