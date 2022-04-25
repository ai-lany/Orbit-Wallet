import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import{ChartData, ChartArea} from 'chart.js'
import { Line } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export function Graph() {
 
  const options = {
    layout: {
      padding: {
        bottom: 20
      }
    },
    responsive: true,
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
      xAxis: {
        display: false,
        ticks:{
          display: false
        },
        grid: {
          display: false
        }
      },
    },
    plugins: {
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
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
     },
    ],
  };
  
  return <Line options={options} data={data}/>
}