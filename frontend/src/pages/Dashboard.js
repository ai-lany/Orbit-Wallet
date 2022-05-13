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

function Dashboard(props) {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
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

  const radios = [
    { name: '1D', value: '1' },
    { name: '7D', value: '2' },
    { name: '1M', value: '3' },
    { name: '6M', value: '4' },
    { name: '1Y', value: '5' }
  ];

  return (
    <div className="Dashboard" style={{ width: "100vw" }}>
      <NavBar auth={true}></NavBar>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
          <Col lg={2} className="DashNav">
          <DashNav  loc="dashboard"></DashNav>
          </Col>
          
          <Col lg={6}>
            <div className="glass-black vertical-space" >
              <div style={{display: "flex",padding:"1em"}}>
                <div style={{flex: "0 50%"}}>
                  <p>Your Portfolio</p>

                  <h2  >
                    $12,993
                  </h2>
                </div>
                  <div style={{flex: "0 50%", display:"flex", alignContent:"center", height: "2.5em",  position:"absolute",right: "2em", top:"2.5em"}}>
                  <ButtonGroup  >
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant='outline-dark'
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
                  </div>

              </div>
              <hr>
              </hr>
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
