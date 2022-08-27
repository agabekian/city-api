'use strict'

let cache = require('./cache.js');
const axios = require('axios');
module.exports = getMovies;

function getMovies(city) {
  console.log("im getMovies");
  const key = "movies-" + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
  console.log(url);
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log("Cache hit for films");
  } else {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovies(response.data));
    console.log("Cache miss");
  }

  return cache[key].data
}
function parseMovies(moviesData) {
  try {
    console.log("Anyone..movies?")
    const moviesSummaries = moviesData.results.map(m => {
      return new Movie(m);
    });
    return Promise.resolve(moviesSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(filmObj) {
    this.title = filmObj.original_title;
    this.poster_path = filmObj.poster_path;
  }
}

