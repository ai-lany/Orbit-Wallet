import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink, Button } from "react-bootstrap";
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/Nav";
import CoinInfo from './components/CoinInfo'
import DashNav from "./components/DashNav";

function Explore(props) {
  const navigate = useNavigate();


  
  return (
    <div className="Explore" style={{ width: "100vw" }}>
      <NavBar auth={true}></NavBar>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
        <DashNav loc= "explore"></DashNav>
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
