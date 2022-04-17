import { React, useState, useEffect } from 'react'
import cryptoData from "./ListData.js"
import Widget from './Widget';
import '../App.css';
import axios from 'axios';
import useIsMounted from '../useIsMounted.js';

function CryptoList(props) {

    const filteredData = cryptoData.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })
    

    return (
    <div className='List'>
        
            {filteredData.map(data => {
                    return (
                        <div className = "widget-container">
                            <Widget list = {filteredData} input = {data.name}  />
                        </div>
                    );
            })}



        
    </div>
    );
}

export default CryptoList