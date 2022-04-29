import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./App.css";
import CryptoList from "./components/CryptoList";
import {Container} from 'react-bootstrap';
import PizzaChart from "./components/Graph";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/LogIn";

function App() {
 
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };



  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<CryptoList input={inputText} />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div> //End of App
  );
}

export default App;