import '../App.css';
import axios from 'axios';
import React, {useState, useEffect} from "react";
import useIsMounted from '../useIsMounted';
import { Graph } from './Graph';

function Widget(props) {

  var name = String(props.input);
  const isMounted = useIsMounted();
  const [price, setPrice] = useState([]);
  const [change, setChange] = useState([]);
  const [icon, setIcon] = useState([]);

  const getInfo = () => {
    axios.get("https://api.coingecko.com/api/v3/coins/" + (props.input).toLowerCase())
      .then(response => {
        const icon = (response.data.image.small);
        const price = (response.data.market_data.current_price.usd);
        const change = (response.data.market_data.price_change_percentage_24h_in_currency.usd);
        
        console.log(price);
        if (isMounted.current){
          setPrice(price);
          setChange(change);
          setIcon(icon);
        }
      })
      .catch(error=> console.error('error: ' + error));
    }


    useEffect(() => {
      if (isMounted.current){getInfo();}
    });
    
    var idchange = name + "-change"
    
    
 
  
  return (
    
    <div id = {name} className="Widget">
      <div className=''>
      <table className="tg">
        <thead>
          <tr>
            <td class="" rowSpan="2">
              <img alt={name} src={icon}/>
            </td>
            <td className=""><h5 className='coin-name'>{props.input}</h5></td>
            <td className=""></td>
          </tr>
          <tr className='price-info'>
            <td className=""><h3 className = 'price'>${price}</h3></td>
            <td className=""><p id={idchange} className='noselect change'>&ensp;{Math.round((change + Number.EPSILON) * 100) / 100}%</p></td>
          </tr>
        </thead>
        </table>
        <div className='graph-container'><Graph id ={name} change = {change}></Graph></div>
      </div>
    </div>
  );
}

export default Widget;
