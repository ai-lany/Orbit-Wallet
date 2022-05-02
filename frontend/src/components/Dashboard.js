import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink} from 'react-bootstrap'
import { Graph } from "./Graph";
import Widget from "./Widget";

function Dashboard(props) {
 
  return (
    <div className="Dashboard" style={{ width: "100vw" }}>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
          <h1>Dashboard</h1>
          <div className="d-none d-lg-block dash-nav">
            <ul>
              <li>
                <NavLink>Dashboard</NavLink>
              </li>
              <li>
                <NavLink>History</NavLink>
              </li>
              <li>
                <NavLink>Help</NavLink>
              </li>
              <li>
                <NavLink>Settings</NavLink>
              </li>
            </ul>
          </div>
          <Col lg={7}>
            <div className="glass dash-main">
              <h3>Portfolio</h3>
              <Container className="bg-white">sdfsdfsd</Container>

              <h3>Watchlist</h3>
              <Container className="bg-white">sdflksdflkn</Container>
            </div>
          </Col>
          <Col lg={3}>
            <div className="glass other">
              <h3>Transaction History</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
