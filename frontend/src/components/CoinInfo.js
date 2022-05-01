import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink, Button} from 'react-bootstrap'
import cryptoData from '../data/ListData'
import axios from 'axios';
import Info from "./Info";

function CryptoInfo(props) {
    

    
  return (
    <div className="mx-auto">
      <div className="Info">
        <div className="coin-list glass " style={{ margin: "0 0 2em 0" }}>
          {cryptoData
            .filter((coin, index) => index < 5)
            .map((data) => {
              return (
                <table className="">
                  <Info list={cryptoData} name={data.name} id={data.id} />
                </table>
              );
            })}
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button className="btn btn-outline-light">View More</button>
      </div>
    </div>
  );
}

export default CryptoInfo;
