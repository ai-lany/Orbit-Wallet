import "../../App.css";
import React, { useState, useEffect } from "react";
import cryptoData from '../../data/ListData'
import Info from "./Info";

function CryptoInfo(props) {
    
  const count = props.count;
    
  return (
    <div className="mx-auto">
      <div className="Info">
        <div className="coin-list glass " style={{ margin: "0 0 2em 0" }}>
          {cryptoData
            .filter((coin, index) => index < count)
            .map((data) => {
              return (
                <table className="">
                  <Info list={cryptoData} name={data.name} id={data.id} />
                </table>
              );
            })}
        </div>
      </div>
      <div style={{padding: "3em 0 0"}} class="d-none d-lg-flex justify-content-center">
        <button  className="btn text-light black-glass">View More</button>
      </div>
    </div>
  );
}

export default CryptoInfo;
