const express = require("express");
const bodyParser = require('body-parser');
const path = require('path'); 
const axios = require("axios");
const app = express();

price = 0;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend//build')));


// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
  
app.listen(3001, function(){
    console.log("Server is running on port 3001.")
    
});



function getPrice (id) {
  return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + id.toLowerCase())
      .then(response => {
        this.response = response.data
        return this.response[0].current_price
      })
  }



app.get('/', (req, res) => {
  
  getPrice('ethereum')
    .then(data => {
      price = data; 
      console.log("Price : " + price)
  });

  var price = price;

  res.render(__dirname + "../frontend/build/index.html", {price:price});
});