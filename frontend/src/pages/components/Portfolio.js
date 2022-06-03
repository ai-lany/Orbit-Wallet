import React, { useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import{ChartData, ChartArea} from 'chart.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import useIsMounted from '../../useIsMounted';
import 'chartjs-plugin-style';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Graph } from './Graph';

const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



export default function Portfolio(props) {
  const [coinData, setCoinData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [radioValue, setRadioValue] = useState('1');
  const change = props.change;
  const [days, setDays] = useState('1')
  var color="pink"
  
  
     useEffect(() => {
      setDays(getInfo(radioValue))
      console.log(days)
     });


  
     const radios = [
      { name: '1D', value: '1' },
      { name: '7D', value: '2' },
      { name: '1M', value: '3' },
      { name: '6M', value: '4' },
      { name: '1Y', value: '5' }
    ];


  const getInfo = (radio) => {
    var day;
    if(radio == '1'){
      day = 1;
    }else if(radio == '2'){
      day = 7;
    }else if(radio == '3'){
      day = 30;
    }else if(radio == '4'){
      day = 180;
    }else if(radio == '5'){
      day = 365;
    }
    return day;
  }

  
  return( 
  
    <div className="glass-black vertical-space" >
              <div style={{display: "flex",padding:"1em"}}>
                <div style={{flex: "0 50%"}}>
                  <p>Your Portfolio</p>

                  <h2  >
                    $12,993
                  </h2>
                </div>
                  <div style={{flex: "0 50%", display:"flex", alignContent:"center", height: "2.5em",  position:"absolute",right: "2em", top:"2.5em"}}>
                  <ButtonGroup  >
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant='outline-dark'
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {setRadioValue(e.currentTarget.value)}}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
                  </div>

              </div>
              <hr></hr>

              <div style={{height:"30vh", width: "98%", padding: "1em"}}>
                 <Graph id={'bitcoin'}  type = 'coin' days={days} />
              </div>

              
            </div>

  )
}