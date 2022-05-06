import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink, Button } from "react-bootstrap";
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CoinInfo from './components/CoinInfo'

function Explore(props) {
  const navigate = useNavigate();


  
  return (
    <div className="Explore" style={{ width: "100vw" }}>
      <Header auth={true}></Header>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
          <div  className="d-none d-lg-block dash-nav">
            <ul>
              <li>
                <Button href="/dashboard">Dashboard</Button>
              </li>
              <li>
                <Button href="/explore">Explore</Button>
              </li>
              <li>
                <Button href="/help">Help</Button>
              </li>
              <li>
                <Button href="/settings">Settings</Button>
                
              </li>
            </ul>
          </div>
          <Col lg={7}>
    
            <CoinInfo style={{width: "100%"}} count={15}></CoinInfo>
          
        
          </Col>
          <Col lg={3}>
            <div className="glass-black ">
              <div className="glass-black">
               <h3 style={{padding: ".25em .5em"}}>.</h3>
              </div>
              sldkfnslkdf
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Explore;
