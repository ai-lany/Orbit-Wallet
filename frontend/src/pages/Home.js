import "../App.css";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Widget from "./components/Widget";
import Eth from "./components/Eth";
import CoinInfo from "./components/CoinInfo";
import NavBar from "./components/Nav";
import Orb, { ColorPalette, Orb2 } from "./components/Orb";
import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";

//Animations / Fancy Stuff:
import { gsap, TweenMax, Linear } from "gsap";
import jwtDecode from "jwt-decode";


function Home(props) {

  const token = localStorage.getItem("token");
  if (token) {
    const user = jwtDecode(token);
    if (user) {
      window.location.href = '/dashboard';
    }
  }
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
    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        const orb = new Orb(colorPalette.randomColor());
        app.stage.addChild(orb.graphics);
        orbs.push(orb);
      } else {
        const orb = new Orb2(colorPalette.randomColor());
        app.stage.addChild(orb.graphics);
        orbs.push(orb);
      }

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
      <Row style={{ height: "95vh", zIndex: "5", width: "100vw", position: "absolute", top: "6em" }}>
        <Col lg={8}>
          <h1 style={{}} className="heading text-light d-inline-block">
            Discover, trade, <br />
            and sell <span>trusted </span><br />
            <span> cryptocurrencies.</span>
          </h1>
        </Col>
       
      </Row>
      
    </div>
  );
}

export default Home;
