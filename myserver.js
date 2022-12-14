'use strict';
const axios = require('axios');
const getMovies = require('./modules/Movies');
const getWeather = require('./modules/Weather');

console.log('Starting up the server');

// REQUIRES - we use require on the backend and import on the front end
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// once express is in we need to use it - per express docs
// middleware to share resources across the internet
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
// define port for server to listen on
// 3002 — if my server runs on 3002, I know something is wrong with my .env file or how I'm importing the values from it

// ROUTES - our endpoints

// Base route - proof of life
// .get() is an express method it correlates to axios.get
// the first parameter is a URL in quote, the second is a callback function
app.get('/', (request, response) => {
  response.status(200).send('Welcome to our server');
});
// app.get('/weather', (request, response, next) => {
//   try {
//     let name = request.query.name;
//     // console.log(typeof name)
//     console.log(data[0].city_name);
//     let dataToGroom = data.find(obj => obj.city_name === name);
//     console.log(dataToGroom);
//     let dataToSend = dataToGroom.data.map(d => {return new Forecast(d)});
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     // if I have an error, this will create a new instance of the Error Object that lives in Express.
//     next(error);
//   }
// });



// Endpoints
app.get('/weather', getWeather);
app.get('/movies', getMovies);

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// LISTEN starts the server
// .listen() is an express method that takes in a PORT value and a callback function
app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`) || 3002);

