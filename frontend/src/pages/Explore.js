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
import Actions from "./components/Actions";

function Explore(props) {
  const navigate = useNavigate();


  
  return (
    <div className="Explore" style={{ width: "100vw" }}>
      <NavBar auth={true}></NavBar>
      <Container style={{ width: "100vw" }}>
      <Row style={{ width: "98vw"}}>
        <Col  lg={2} className="DashNav">
        <DashNav loc= "explore"></DashNav>
        </Col>
          <Col lg={7} className='content'>
            <CoinInfo style={{width: "100%"}} count={15}></CoinInfo>
          </Col>
          <Actions></Actions>
        </Row>
      </Container>
    </div>
  );
}

export default Explore;
