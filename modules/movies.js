'use strict'
let cache = require('./cache.js');
const axios = require('axios');
modules.export = getMovies;

function getMovies(keyword) {
    const key = "movies-" + keyword;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log("Cache hit fo-sho");
    } else {
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
            .then(respone => parseMoviesData(response.data));
        console.log("Cache miss");
    }
    return cache[key].data
}

function parseMoviesData(moviesData) {
    try {
        const MoviesSummaries = movies.data.map(m => {
            return new Movie(m)
        });
        return Promise.resolve(MoviesSummaries);
    } catch (e) {
        return Promise.reject(e)
    }
}

class Movie {
    constructor(filmObj) {
        this.title = filmObj.original_title;
        this.poster_path = filmObj.poster_path;
    }
}