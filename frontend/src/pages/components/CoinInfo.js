import "../../App.css";
import React, { useState, useEffect } from "react";
import cryptoData from '../../data/ListData'
import Info from "./Info";
import { Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";

function CryptoInfo(props) {
    
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({});
  const [watchlist, setWatchlist] = useState();

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
        setWatchlist(props.watchlist);
      }
    }

  }, []);
  if(!auth || window.location.pathname == '/'){
    return (
      <div className="">
        <div className=" d-block mx-auto">
          <div className="d-none d-sm-block glass-black text-light " style={{overflow:"hidden"}}>
            
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
              <div className="d-none d-xl-block" style={{flex:"0 15%"}}>
                <Button style={{color: "grey"}} variant="btn ">Market Cap</Button>
              </div>
          
            </div>
            {cryptoData
              .filter((coin, index) => index < props.count)
              .map((data) => {
                return (
                    <Info list={cryptoData} name={data.name} id={data.id} />
                );
              })}
          </div>
        </div>
      </div>
      
    );
  }else if(window.location.pathname == '/explore'){

    return (
      <div className="">
        <div className=" d-block mx-auto">
          <div className="d-none d-sm-block glass-black text-light " style={{overflow:"hidden"}}>
            
            <div className="d-flex glass-black" style={{zIndex:"2", width: "100%", height: "3em", padding: ".3em 1em .5em"}}>
             <h3>Explore</h3> <h3 style={{position:"absolute", right: ".5em", top:"0"}}>...</h3>
            </div>
            {cryptoData
              .filter((coin, index) => index < props.count)
              .map((data) => {
                return (
                    <Info name={data.name} id={data.id} />
                );
              })}
          </div>
        </div>
      </div>
      
    );
  }else if(window.location.pathname == '/dashboard'){
    
    return (
      <div className="">
        <div className=" d-block mx-auto">
          <div className="d-none d-sm-block glass-black text-light " style={{overflow:"hidden"}}>
            
            <div className="d-flex glass-black" style={{zIndex:"2", width: "100%", height: "3em", padding: ".3em 1em .5em"}}>
             <h3>Watchlist</h3> <h3 style={{position:"absolute", right: ".5em", top:"0"}}>  <a href="#" className="text-grey">...</a></h3>
            </div>
            {props.watchlist.map((data, index) => {
               
                return (
                    <Info  name={data} id={index+1} />
                );
                })}
          </div>
        </div>
      </div>
      
    );
  }
  
}

export default CryptoInfo;
