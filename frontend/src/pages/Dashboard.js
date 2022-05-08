import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink, Button } from "react-bootstrap";
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/Nav";
import CoinInfo from './components/CoinInfo'
import DashNav from "./components/DashNav";

function Dashboard(props) {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate.replace("/login");
      } else {
        Promise.all([
          populateWatchlist(),
        ])
  
        
      }
    }
  }, []);

  async function populateWatchlist() {
    const req = await fetch("http://localhost:3001/api/favorite", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        'Accept': 'application/json'
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      if(useIsMounted){
        setWatchlist(data.watchlist);
      }
      
    } else {
      alert(data.error);
    }

  }

  return (
    <div className="Dashboard" style={{ width: "100vw" }}>
      <NavBar auth={true}></NavBar>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
          <DashNav loc="dashboard"></DashNav>
          <Col lg={7}>
            <div className="glass-black vertical-space">
              <div className="glass-black" style={{padding: ".5em"}}><h3>Portfolio</h3></div>
              <div className="section" style={{height:" 40vh"}}>
                <Graph type="portfolio" id={'bitcoin'} ></Graph>
              </div>

              
            </div>
            
           
            <CoinInfo watchlist={watchlist} style={{width: "100%"}} ></CoinInfo>
        
          </Col>
          <Col lg={3}>
            <div className="glass-black ">
              <div className="glass-black">
               <h3 style={{padding: ".25em .5em"}}>Transactions</h3>
              </div>
              ...
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
