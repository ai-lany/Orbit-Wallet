import "../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../useIsMounted";
import {Container, Row, Col, NavLink} from 'react-bootstrap'
import cryptoData from '../data/ListData'
import axios from 'axios';
import Info from "./Info";

function CryptoInfo(props) {
    

    
  return (
    <div className="Info ">
        <div className ="coin-list glass">
        {cryptoData.map(data => {
                    return (
                        <div className="">
                            <Info list = {cryptoData} name = {data.name}  />
                        </div>
                    );
            })}
        </div>
    </div>
  );
}

export default CryptoInfo;
