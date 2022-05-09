import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import SignUp from "./SignUp";
import Eth from "./components/Eth";
import CryptoList from "./components/CryptoList";
import CoinInfo from "./components/CoinInfo";
import Arrows from "../assets/shape-71.svg";
import NavBar from "./components/Nav";
import Orb, {ColorPalette} from "./components/Orb";
import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";

//Animations / Fancy Stuff:
import { gsap, TweenMax, Linear } from "gsap";

function Home(props) {
  useEffect(() => {
    gsap.fromTo(".heading", { x: -30 }, { x: 0, duration: 2 });
    gsap.fromTo(".heading", { opacity: 0 }, { opacity: 1, duration: 2 });

    //BG BLUR:
    const app = new PIXI.Application({
      // render to <canvas class="orb-canvas"></canvas>
      view: document.querySelector(".orb-canvas"),
      // auto adjust size to fit the current window
      resizeTo: window,
      // transparent background, we will be creating a gradient background later using CSS
      transparent: true,
    });
    const orbs = [];
    const colorPalette = new ColorPalette();
    for (let i = 0; i < 10; i++) {
      
      // each orb will be black, just for now
      const orb = new Orb(colorPalette.randomColor());
      app.stage.addChild(orb.graphics);

      orbs.push(orb);
    }
    // Animate!
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      app.ticker.add(() => {
        // update and render each orb, each frame. app.ticker attempts to run at 60fps
        orbs.forEach((orb) => {
          orb.update();
          orb.render();
        });
      });
    } else {
      // perform one update and render per orb, do not animate
      orbs.forEach((orb) => {
        orb.update();
        orb.render();
      });
    }
    app.stage.filters = [new KawaseBlurFilter(30, 10, true)];
  });//end useEffect

  return (
    <div className="Home">

      <NavBar></NavBar>
      <div className="bg-blur"></div>
      <canvas class="orb-canvas"></canvas>
      <Row style={{ height: "95vh", zIndex:"5" , width: "100vw", position: "absolute", top: "4em"}}>
        <Col lg={8}>
          <h1 style={{}} className="heading text-light d-inline-block">
            Discover, trade, <br/>
            and sell <span>trusted </span><br/>
            <div
              style={{
                display: "inline",
                height: "4.5rem",
                width: "4.5rem",
                overflow: "hidden",
                backgroundImage: `url(${Arrows})`,
              }}
            ></div>
            <span> cryptocurrencies.</span>
          </h1>
        </Col>
        <Col lg={4} className="d-inline-block">
          <Eth></Eth>
          <div
            className="d-flex"
            id="landing-widget"
            style={{ justifyContent: "center"}}
          >
            {" "}
            <Widget input="Ethereum" />
          </div>
        </Col>
      </Row>
      <div  style={{position:"absolute",top:"100vh", right:"18vw", width: "65%", margin: "0 auto" }}>
        <CoinInfo count={5}></CoinInfo>
      </div>
    </div>
  );
}

export default Home;
