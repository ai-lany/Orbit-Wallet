import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container,Button} from "react-bootstrap";
import { TextField, FormGroup, FormControlLabel, Checkbox} from "@mui/material/";



function Login(props) {
  return (
      <div className="">
  <div className="">
     <h1 className="center">Log In</h1>
   <Container className="login-container center">
       <FormGroup sx ={{width: 300}}>
            <TextField className = "" id="standard-basic" label="Username" variant="standard" sx={{marginTop: 2}} />
            <TextField className = "" id="standard-basic" label="Password" type = "password" variant="standard" sx={{marginTop: 2}}/>
            <FormControlLabel control={<Checkbox  />} sx={{marginTop: 2}} label="Remember me next time" />
            <Button variant="dark" className="login "> Sign In </Button>
       </FormGroup>
   </Container>
   </div>
   </div>
  );
}

export default Login;
