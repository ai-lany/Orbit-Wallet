import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink, Button , ButtonGroup, ToggleButton} from "react-bootstrap";
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/Nav";
import CoinInfo from './components/CoinInfo'
import DashNav from "./components/DashNav";
import Actions from "./components/Actions";
import Portfolio from "./components/Portfolio";


function Dashboard() {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([])
  const [radioValue, setRadioValue] = useState('1');

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
    const req = await fetch("https://orbit-wallet.herokuapp.com/api/favorite", {
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

  const radios = [
    { name: '1D', value: '1' },
    { name: '7D', value: '2' },
    { name: '1M', value: '3' },
    { name: '6M', value: '4' },
    { name: '1Y', value: '5' }
  ];

  return (
    <div className="Dashboard">
      <NavBar auth={true}></NavBar>
      <Container>
        <Row style={{ width: "98vw"}}>
          <Col lg={2}>
          <DashNav  loc="dashboard"></DashNav>
          </Col>
          
          <Col className='content' lg={7} style={{padding: "0 2em "}} >
            <Portfolio id={'bitcoin'}></Portfolio>
           
            <CoinInfo watchlist={watchlist} style={{width: "100%"}} ></CoinInfo>
        
          </Col>
          <Actions></Actions>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
