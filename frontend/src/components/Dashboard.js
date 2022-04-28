import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink} from 'react-bootstrap'
import { Graph } from "./Graph";
import Widget from "./Widget";

function Dashboard(props) {
 
  return (
    <div className="Dashboard">
      <Container>
        <Row>
          <h1>Dashboard</h1>
          <Col xs={2} className="dash-nav">
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
          </Col>
          <Col lg={7} className="dash-main">
            <h3>Portfolio</h3>
            <Container className="bg-white">sdfsdfsd</Container>

            <h3>Watchlist</h3>
            <Container className="bg-white">sdflksdflkn</Container>

          </Col>
          <Col lg={3} className="other">
            <h3>Transaction History</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
