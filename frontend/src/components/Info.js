import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import cryptoData from "../data/ListData.js";
import axios from "axios";
import { Graph } from "./Graph";

function Info(props) {
  var name = String(props.name);
  const isMounted = useIsMounted();
  const [price, setPrice] = useState([]);
  const [change, setChange] = useState([]);
  const [icon, setIcon] = useState([]);

  const getInfo = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/" + props.name.toLowerCase()
      )
      .then((response) => {
        const icon = response.data.image.small;
        const price = response.data.market_data.current_price.usd;
        const change =
          response.data.market_data.price_change_percentage_24h_in_currency.usd;

        console.log(price);
        if (isMounted.current) {
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
    <div className=" coinlist-item  w-100">
        <img src={icon}></img>
      <div className="d-inline"><h5 className="d-inline">{props.name}</h5></div>
      <div className="d-inline info-graph">
      <Graph className="" id ={name} change = {change}></Graph>
      </div>
      {price}
      <hr></hr>
    </div>
  );
}

export default Info;
