import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Button, Form } from "react-bootstrap";

function SignUp(props) {
  return (
    <div className="">
      <div className="">
        <h1 className="center">Sign Up</h1>
        <Container className="login-container center">
          <form  method ='post'>
            <div className="form-group">
              <input name='username'type="text" className="form-control" placeholder="Username"/>
            </div>
            <div className="form-group">
              <input name='email'type="email" className="form-control" placeholder="example@orbit.com" />
            </div>
            <div className="form-group">
              <input name='password'type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit"
                className="btn btn-dark btn-block"
              />
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;
