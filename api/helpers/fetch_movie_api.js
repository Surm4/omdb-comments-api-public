const axios = require('axios');

const fetchMovieApi = async (searchOption, searchParameter) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=6b083297&${searchOption}=${searchParameter}`);
      return response.data;
    } catch (e) {
      return;
    }
};

module.exports = {
    fetchMovieApi
}