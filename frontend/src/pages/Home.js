import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink} from 'react-bootstrap'
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import SignUp from "./SignUp";
import Eth from "./components/Eth";
import CryptoList from "./components/CryptoList";
import CoinInfo from './components/CoinInfo';
import Arrows from "../assets/shape-71.svg"
import { gsap } from "gsap";


function Home(props) {
 

    useEffect(() => {
        gsap.fromTo(".heading", {x: -30}, {x: 0, duration: 2});
        gsap.fromTo(".heading", {opacity: 0}, {opacity: 1, duration: 2});
    })

  return (
    <div className="Home">
        <Row style={{padding: "0 0 10em"}}>
        <h1 className="heading text-light d-inline-block">Discover, trade, and sell <span >trusted cryptocurrencies. </span><img className = "exchange-arrows"src={Arrows}></img></h1>
      <Col lg={3} className="d-inline-block">
          
        <Eth></Eth>
        <div id="landing-widget"> <CryptoList  input="ethereum"/> </div>
        
      </Col>
        </Row>
        <Row>
            <CoinInfo count={3} ></CoinInfo>
            
        </Row>
      

    </div>
  );
}

export default Home;
