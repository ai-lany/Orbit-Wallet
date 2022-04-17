import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./App.css";
import CryptoList from "./components/CryptoList";
import {Container} from 'react-bootstrap';
import PizzaChart from "./components/Graph";

function App() {
 
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };



  return (
    <div className="App">
      <div className="search center">
      <TextField
          id="standard-search"
          label="What are you looking for?"
          type="search"
          variant="outlined"
          onChange={inputHandler}
        />
        
    </div>
    <div className="">
    <CryptoList input = {inputText} />

    </div>

    </div>
    
  );
}

export default App;