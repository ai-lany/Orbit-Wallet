import "../../App.css";
import React, { useState, useEffect } from "react";
import cryptoData from '../../data/ListData'
import Info from "./Info";
import { Button } from "react-bootstrap";

function CryptoInfo(props) {
    
  const count = props.count;
    
  return (
    <div className="">
      <div className="Info d-block mx-auto">
        <div className="d-none d-lg-block coin-list glass " style={{overflow:"hidden", margin: "0 0 2em 0" }}>
          
          <div className="d-flex glass-black" style={{zIndex:"2", width: "100%", height: "3em"}}>
            <div style={{flex:"0 10%"}}>
              <Button style={{color: "grey"}} variant="btn " >#</Button>
            </div>
            <div style={{flex:"0 30%"}}>
              <Button style={{color: "grey"}} variant="btn ">Coin</Button>
            </div>
            <div style={{flex:"0 18%"}}>
              <Button style={{color: "grey"}} variant="btn ">Price</Button>
            </div>
            <div style={{flex:"0 13%"}}>
              <Button style={{color: "grey"}} variant="btn ">24h</Button>
            </div>
            <div class="d-none d-xl-block" style={{flex:"0 15%"}}>
              <Button style={{color: "grey"}} variant="btn ">Market Cap</Button>
            </div>
        
          </div>
          {cryptoData
            .filter((coin, index) => index < count)
            .map((data) => {
              return (
                  <Info list={cryptoData} name={data.name} id={data.id} />
              );
            })}
        </div>
      </div>
      <div style={{padding: "3em 0 0"}} class="d-none d-lg-block ">
        <button  className="btn text-light black-glass">View More</button>
      </div>
    </div>
    
  );
}

export default CryptoInfo;
