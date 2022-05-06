import "../../App.css";
import React, { useState, useEffect } from "react";
import cryptoData from '../../data/ListData'
import Info from "./Info";
import { Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";

function CryptoInfo(props) {
    
  const count = props.count;
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({})
 
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        setAuth(false);
      } else {
        setAuth(true);
        setUser(user);
      }
    }

  }, []);
  if(!auth){
    return (
      <div className="">
        <div className=" d-block mx-auto">
          <div className="d-none d-md-block glass-black text-light " style={{overflow:"hidden"}}>
            
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
      </div>
      
    );
  }else{
    return (
      <div className="">
        <div className=" d-block mx-auto">
          <div className="d-none d-md-block glass-black text-light " style={{overflow:"hidden"}}>
            
            <div className="d-flex glass-black" style={{zIndex:"2", width: "100%", height: "3em", padding: ".3em 1em .5em"}}>
             <h3>Explore</h3> <h3 style={{position:"absolute", right: ".5em", top:"0"}}>...</h3>
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
      </div>
      
    );
  }
  
}

export default CryptoInfo;
