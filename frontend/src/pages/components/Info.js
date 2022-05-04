import "../../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../../useIsMounted";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Graph } from "./Graph";

function Info(props) {
  var name = String(props.name);
  const isMounted = useIsMounted();
  const [price, setPrice] = useState([]);
  const [change, setChange] = useState([]);
  const [icon, setIcon] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [color, setColor] = useState([]);
  const [marketCap, setMarketCap] = useState([]);

  const getInfo = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/" + props.name.toLowerCase())
      .then((response) => {
        const icon = response.data.image.small;
        const price = response.data.market_data.current_price.usd;
        const change =
          response.data.market_data.price_change_percentage_24h_in_currency.usd;
        const symbol = response.data.symbol.toUpperCase();
        const marketCap =
          response.data.market_data.market_cap_change_percentage_24h;

        console.log(price);
        if (isMounted.current) {
          setPrice(price);
          setChange(change);
          setIcon(icon);
          setSymbol(symbol);
          setMarketCap(marketCap);
          if (change > 0) {
            setColor("#52f268");
          } else {
            setColor("#f25252");
          }
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
    <div className=" coinlist-item  w-100">
      <h5
        className="d-inline"
        style={{ padding: "0 1em 0 0.5em", width: "2em" }}
      >
        {props.id}
      </h5>
      <img src={icon} style={{ padding: "0 1em 0 1em" }}></img>
      <div className="d-inline" style={{ padding: "0 3em 0 0", width: "15em" }}>
        <h5 className="d-inline">{props.name}&nbsp;</h5> {symbol}
      </div>

      <div style={{ width: "10em" }}>${price}</div>
      <div style={{ width: "10em", color: color }}>
        {Math.round((change + Number.EPSILON) * 100) / 100}%
      </div>
      <div style={{ width: "10em", color: color }}>
        {Math.round((marketCap + Number.EPSILON) * 100) / 100}%
      </div>
      <div className="d-inline info-graph">
        <Graph className="" id={name} change={change}></Graph>
      </div>

      <hr></hr>
    </div>
  );
}

export default Info;
