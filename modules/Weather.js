const axios = require('axios');
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
  class Forecast {
    constructor(resObj) {
      this.date = resObj.datetime;
      this.high_temp = resObj.high_temp;
      this.description = resObj.weather.description;
    }
  }

  module.exports = getWeather;