'use strict';

require('dotenv').config(); //fix 1
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');
const app = express();

app.use(cors()); //lack of cors was not allowing cache file to be hit, MIND THE ORDER!
app.get('/weather', weatherHandler);
app.get('/movies', moviesHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
} 

function moviesHandler(request, response) {
  const {city} = request.query;
  movies(city)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
} 
app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
