import React, { useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import{ChartData, ChartArea} from 'chart.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import useIsMounted from '../../useIsMounted';
import 'chartjs-plugin-style';
import { premultiplyRgba, rgb2hex } from '@pixi/utils';

const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



export function Graph(props) {
  const isMounted = useIsMounted();
  const [coinData, setCoinData] = useState([])
  const [labels, setLabels] = useState([])
  const change = props.change;
  var color;
  
  if(props.type == "portfolio" || props.type == "coin" ){
    color = "pink";
  }else{
    if (change > 0){
      color = "#52f268";
    }else{
      color = "#f25252";
    }
  }
  

  useEffect(() => {
    if (isMounted.current){getInfo();}
  },[]);

  const formatData = coinData => {
    return coinData.map(el => {
      return{
        time: el[0],
        price: el[1]
      }
    })
  }

  const getInfo = () => {
    axios.get("https://api.coingecko.com/api/v3/coins/" + (props.id).toLowerCase() + "/market_chart?vs_currency=usd&days=1")
    .then(response => {
        var dayChart = response.data.prices
        if (isMounted.current){
          setCoinData(dayChart)
          const label = dayChart.map(function(x) {
            return new Date(x[0]).toLocaleTimeString('en-us', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit'});
          });
          setLabels(label)
        
        }
      })
      .catch(error=> console.error('error: ' + error));
    };


  
    /*const determineTimeFormat = () => {
      switch (timeFormat) {
        case "24h":
          return day;
        case "7d":
          return week;
        case "1y":
          return year;
        default:
          return day;
      }
    };*/

  



  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation:{
      duration: 100
    },
    layout: {

    },
    type: 'line',
    scales: {
      yAxes: {
        display: false,
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
      xAxes: {
        display: props.xAxis,
        ticks:{
          display: true,
          maxRotation: 0,
          align: "start",
          autoSkip: false,
          callback: function(val, index) {
            // Hide every 2nd tick label
            return index % (64 )=== 0 ? this.getLabelForValue(val) : '';
          },
        },
        grid: {
          display: false,
          align: "end",
        },
      },
    },
    plugins: {
      tooltip:{
        displayColors: false,
        callbacks: {
          label: function(context) {
              let label = context.dataset.label || '';

              if (label) {
                  label += ': ';
              }
              if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
              return label;
          }
      }
      },
      legend:{
        display: false
      },
    }
    
  };
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: coinData,
        borderColor: color,
        pointBackgroundColor: color,
        outerGlowWidth: 10,
        outerGlowColor: 'rgba(255,255,255)',
        pointRadius: 1,
        tension: 0.4,
     },
    ],
  };
  
  return <Line options={options} data={data}/>
}