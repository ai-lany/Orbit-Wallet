import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink} from 'react-bootstrap'
import { Graph } from "./components/Graph";
import Widget from "./components/Widget";
import jwtDecode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

function Dashboard(props) {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');
  const [tempQuote, setTempQuote] = useState('');


  async function populateQuote() {
		const req = await fetch('http://localhost:3001/api/quote', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(data.quote)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = jwtDecode(token);
			if (!user) {
				localStorage.removeItem('token');
				navigate.replace('/login');
			} else {
				populateQuote();
			}
		}
	}, [])

	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:3001/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			alert(data.error)
		}
	}
  return (
    <div className="Dashboard" style={{ width: "100vw" }}>
      <Header auth={true} ></Header>
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
              <Container className="bg-white">
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
                
      </Container>
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
