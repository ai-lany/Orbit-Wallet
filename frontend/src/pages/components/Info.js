import "../../App.css";
import React, { useState, useEffect } from "react";
import useIsMounted from "../../useIsMounted";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Graph } from "./Graph";
import jwtDecode from "jwt-decode";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";


function Info(props) {
  var name = String(props.name);
  const isMounted = useIsMounted();
  const [price, setPrice] = useState([]);
  const [change, setChange] = useState([]);
  const [icon, setIcon] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [color, setColor] = useState([]);
  const [marketCap, setMarketCap] = useState([]);
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({})
  const [favorite, setFavorite] = useState()


  function  Favorite(props){
    if(!props.favorite){
      return <SuitHeart size={18}/>
    }else{
      return <SuitHeartFill size={18}/>
    }
  } 
  async function populateFavorite() {
    const req = await fetch("http://orbit-wallet.herokuapp.com/api/favorite", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        'Accept': 'application/json'
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      if(data.watchlist.includes(name)){
        setFavorite(true)
      }else{
        setFavorite(false)
      }
    } else {
      alert(data.error);
    }
  }
 

  async function toggleFavorite(event) {
    event.preventDefault();
    const req = await fetch("http://orbit-wallet.herokuapp.com/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        watchlist: name,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setFavorite(!favorite)
    } else {
      alert(data.error);
    }
  }

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
          Promise.all([ setPrice(price),
          setChange(change),
          setIcon(icon),
          setSymbol(symbol),
          setMarketCap(marketCap)])
          
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
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        setAuth(false);
      } else {
        setAuth(true);
        setUser(user);
        populateFavorite();
      }
    }
    getInfo();
  }, []);

  if(!auth){
    return (
      <div className="d-flex coinlist-item " style={{width: "100%"}}>
        
        <h5
          className=""
          style={{ flex: "0 3%"}}
        >
          {props.id}
        </h5>
        <img src={icon} style={{ flex: "0 2%", padding: "0 .5em 0 1em" }}></img>
        
        <div className="" style={{ flex: "0 30%" }}>
          <h5 className="d-inline">{props.name}&nbsp;</h5> {symbol}
        </div>
      
        <div style={{ flex: "0 20%"  }}>${price}</div>
        <div style={{ flex: "0 15%" , color: color }}>
          {Math.round((change + Number.EPSILON) * 100) / 100}%
        </div>
        <div className="d-none d-xl-block " style={{flex: "0 10%" , color: color }}>
          {Math.round((marketCap + Number.EPSILON) * 100) / 100}%
        </div>
        <div style={{flex: "0 15%"  }} className="info-graph">
            <Graph className="" id={name} change={change}></Graph>
          </div>
  
        <hr></hr>
        
      </div>
    );
  }else{
    return (
      <div className="d-flex coinlist-item " style={{width: "100%"}}>
        
        <h5
          className=""
          style={{ flex: "0 3%"}}
        >
          {props.id}
        </h5>
        <img src={icon} style={{ flex: "0 2%", padding: "0 .5em 0 1em" }}></img>
        
        <div className="" style={{ flex: "0 30%" }}>
          <h5 className="d-inline">{props.name}&nbsp;</h5> {symbol}
        </div>
      
        <div style={{ flex: "0 20%"  }}>${price}</div>
        <div style={{ flex: "0 15%" , color: color }}>
          {Math.round((change + Number.EPSILON) * 100) / 100}%
        </div>
        <div style={{flex: "0 10%"}} className="explore-graph">
            <Graph className="" id={name} change={change}></Graph>
          </div>
          <div style={{flex: "0 10%", position:"absolute",right:".5em"}}>
           <button className="btn text-light" onClick={toggleFavorite}> <Favorite favorite={favorite}/></button>
          </div>
  
        <hr></hr>
        
      </div>
    );
  }

  
}

export default Info;
