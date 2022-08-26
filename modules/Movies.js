const axios = require('axios');

async function getMovies(request, response, next) {
    console.log("I am modularized");
    const { city } = request.query;
    // console.log(city)
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;

    try {
        const moviesBack = await axios.get(url);
        // console.log(moviesBack.data.results)
        const movieArr = moviesBack.data.results.map(m => new Movie(m));
        // console.log(movieArr);
        response.status(200).send(movieArr);
    } catch (err) {
        next(err) //using built-in "next" instead of line below:
        // response.status(500).send(`server error`);
    }
}

class Movie {
    constructor(resObj) {
        this.title = resObj.original_title;
        this.poster_path = resObj.poster_path;
    }
}
module.exports = getMovies;