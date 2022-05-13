import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import NavBar from "./components/Nav";
import DashNav from "./components/DashNav";
import { Graph } from "./components/Graph";
import CoinInfo from "./components/CoinInfo";
import axios from "axios";

function Coin(props) {
  const { name } = useParams();
  const [radioValue, setRadioValue] = useState("1");
  const isMounted = useIsMounted();
  const [price, setPrice] = useState();
  const [change, setChange] = useState("");
  const [icon, setIcon] = useState("");
  const [symbol, setSymbol] = useState("");

  const radios = [
    { name: "1D", value: "1" },
    { name: "7D", value: "2" },
    { name: "1M", value: "3" },
    { name: "6M", value: "4" },
    { name: "1Y", value: "5" },
  ];

  const getInfo = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/" + name.toLowerCase())
      .then((response) => {
        const symbol = response.data.symbol;
        const icon = response.data.image.small;
        const price = response.data.market_data.current_price.usd;
        const change =
          response.data.market_data.price_change_percentage_24h_in_currency.usd;

        console.log(price);
        if (isMounted.current) {
          setSymbol(symbol);
          setPrice(price);
          setChange(change);
          setIcon(icon);
        }
      })
      .catch((error) => console.error("error: " + error));
  };

  useEffect(() => {
    if (isMounted.current) {
      getInfo();
    }
  });

  return (
    <div className="Coin">
      <NavBar auth={true}></NavBar>
      <Container style={{ width: "100vw" }}>
        <Row style={{ width: "100vw" }}>
          <Col lg={2} className="DashNav">
            <DashNav loc="explore"></DashNav>
          </Col>

          <Col lg={6}>
            <div className="glass-black vertical-space">
              <div
                style={{
                  display: "flex",
                  padding: "1em",
                  height: "fit-content",
                }}
              >
                <div style={{ flex: "0 50%" }}>
                  <h1 className="d-inline" style={{ padding: "0 .3em 0 0 " }}>
                    <img
                      style={{
                        height: "1em",
                        position: "relative",
                        bottom: ".1em",
                        padding: "0 .3em 0 0",
                      }}
                      src={icon}
                    ></img>
                    {name}
                  </h1>
                  <h3 className="d-inline text-grey">{symbol.toUpperCase()}</h3>
                  <h3 className="d-inline text-white" style={{position: "absolute", right: "1em"}}>+</h3>
                  <div
                    style={{
                      flex: "0 50%",
                      display: "flex",
                      alignSelf: "flex-end",
                      height: "2.5em",
                      position: "absolute",
                      right: "1em",
                    }}
                  >
                    <ButtonGroup>
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant="outline-dark"
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
                  <h2>{"$" + price}</h2>
                </div>
              </div>

              <hr></hr>
              <div className="section" style={{ height: " 40vh" }}>
                <Graph id={name}></Graph>
              </div>
            </div>
            <div className="glass-black vertical-space">
              <h2> {name}</h2>
            </div>
          </Col>
          <Col lg={3}>
            <div className="glass-black ">
              <div className="glass-black">
                <h3 style={{ padding: ".25em .5em" }}>Trade</h3>
              </div>
              ...
            </div>
            <div className="glass-black ">
              <div className="glass-black">
                <h3 style={{ padding: ".25em .5em" }}>Transactions</h3>
              </div>
              ...
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Coin;
