import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink, Button } from "react-bootstrap";
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CoinInfo from './components/CoinInfo'

function Dashboard(props) {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const [watchlist, setWatchlist] = useState([])

  async function populateQuote() {
    const req = await fetch("https://orbit-wallet.herokuapp.com/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

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
          populateQuote()
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
  async function updateQuote(event) {
    event.preventDefault();

    const req = await fetch("https://orbit-wallet.herokuapp.com/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  }
  return (
    <div className="Dashboard" style={{ width: "100vw" }}>
      <Header auth={true}></Header>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
          <div  className="d-none d-lg-block dash-nav">
            <ul>
              <li>
              <Button className="btn btn-dark w-100" href="/dashboard">Dashboard</Button>
              </li>
              <li>
                <Button className="btn btn-dark w-100" href="/explore">Explore</Button>
              </li>
              <li>
                <Button className="btn btn-dark w-100" href="/help">Help</Button>
              </li>
              <li>
                <Button className="btn btn-dark w-100" href="/settings">Settings</Button>
                
              </li>
            </ul>
          </div>
          <Col lg={7}>
            <div className="glass-black vertical-space">
              <div className="glass-black" style={{padding: ".5em"}}><h3>Portfolio</h3></div>
              <div className="section" style={{height:" 40vh"}}>
                <Graph id={'bitcoin'} ></Graph>
              </div>

              
            </div>
            
           
            <CoinInfo watchlist={watchlist} style={{width: "100%"}} ></CoinInfo>
          
            <div className="">
                Quote: {quote} <br></br>
                <form onSubmit={updateQuote}>
                  <input
                    type="text"
                    placeholder="Quote"
                    value={tempQuote}
                    onChange={(e) => setTempQuote(e.target.value)}
                  />
                  <input type="submit" value="Update quote" />
                </form>
              </div>
          </Col>
          <Col lg={3}>
            <div className="glass-black ">
              <div className="glass-black">
               <h3 style={{padding: ".25em .5em"}}>Transactions</h3>
              </div>
              sldkfnslkdf
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
