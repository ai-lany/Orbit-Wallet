import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink} from 'react-bootstrap'
import { Graph } from "./Graph";
import Widget from "./Widget";
import SignUp from "./SignUp";
import Eth from "./Eth";
import CryptoList from "./CryptoList";
import CoinInfo from './CoinInfo';
import Arrows from "../assets/shape-71.svg"


function Home(props) {
 
  return (
    <div className="Home">
        <Row style={{marginBottom: "100em"}}>
        <h1 className="heading text-light d-inline-block">Discover, trade, and sell <span >trusted cryptocurrencies. </span><img className = "exchange-arrows"src={Arrows}></img></h1>
      <Col lg={3} className="d-inline-block">
          
        <Eth></Eth>
        <div id="landing-widget"> <CryptoList  input="ethereum"/> </div>
        
      </Col>
        </Row>
        <Row>
            <CoinInfo ></CoinInfo>
        </Row>
      

    </div>
  );
}

export default Home;
