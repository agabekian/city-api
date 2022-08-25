'use strict';
const axios = require("axios")

console.log('Am running or what?! Upgraded to 22');

// REQUIRES - we use require on the backend and import on the front end
const express = require('express');
const cors = require('cors');
require('dotenv').config();
let data = require('./data/weather.json');

// once express is in we need to use it - per express docs
const app = express();

// middleware to share resources across the internet
app.use(cors());

// define my port for my server to listen on
const PORT = process.env.PORT || 3002;
// 3002 — if my server runs on 3002, I know something is wrong with my .env file or how I'm importing the values from it


// ROUTES - our endpoints

// Base route - proof of life
// .get() is an express method
// it correlates to axios.get
// the first parameter is a URL in quote,
// the second is a callback function
app.get('/', (request, response) => {
  console.log('This is showing up in the terminal!');
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

class Forecast {
  constructor(resObj) {
    this.date = resObj.datetime;
    this.high_temp = resObj.high_temp;
    this.description = resObj.weather.description;
  }
}

class Movie {
  constructor(resObj) {
    this.title = resObj.original_title;
    this.poster_path=resObj.poster_path;
  }
}

// Endpoints
app.get('/weather', getWeather);
app.get('/movies', getMovies);

async function getWeather(request, response) {
  // note the .searchQuery
  const { lat, lon } = request.query;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5`;
  try {
    // axios get request to our api
    const weatherResponses = await axios.get(url);
    // console.log(">>>>>>>>>>>>>>>>>"+weatherResponses.data.weather);
    // groomed data
    const forecastArray = weatherResponses.data.data.map(f => new Forecast(f));
    console.log("FINAL PRODUCT", forecastArray);
    response.status(200).send(forecastArray);
  } catch (err) {
    console.log('error message is: ', err);
    response.status(500).send(`server error`);
  }
}


async function getMovies(request, response) {
  console.log("Hurray")
  const { city } = request.query;
  console.log(city)
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;

  try {
    const moviesBack = await axios.get(url);
    console.log(moviesBack.data.results)
    const movieArr = moviesBack.data.results.map(m=>new Movie(m));
    console.log(movieArr);
    response.status(200).send(movieArr);
  } catch (err) {
    console.log('error message is: ', err);
    response.status(500).send(`server error`);
  }
}


// ERRORS
// Handle any errors
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
