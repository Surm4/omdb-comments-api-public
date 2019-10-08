const api = require('../helpers/fetch_movie_api');
const db = require('../../db/db');
const dbQueries = require('../helpers/db_queries');
const escapeMovieObject = require('../helpers/escape_movies_object');
const msg = require('../helpers/messages');

const asyncPostMoviesController = (searchOption, searchParameter) => {
    return new Promise(async (res, rej) => {
        const moviesApiResponse = await api.fetchMovieApi(searchOption, searchParameter);

        if (!moviesApiResponse || moviesApiResponse.Response === "False") {
            res({ succesful: false, message: msg.EXT_API_FAILED, status: 500 });
            return;
        }

        const movieObj = escapeMovieObject(moviesApiResponse);

        const movieExistsQuery = await db.executeQuery(dbQueries.selectMovieWhereImdbID(movieObj.imdbID));

        if (!movieExistsQuery.succesful || movieExistsQuery.data.length) {
            res({ succesful: false, message: msg.MOVIE_EXISTS, status: 409 });
            return;
        }

        const movieInsertedSuccesful = await db.executeQuery(dbQueries.insertMovieQuery(movieObj));

        if (!movieInsertedSuccesful.succesful) {
            res({ succesful: false, message: msg.DB_FAILED, status: 500 });
            return;
        }

        const ratingsQuery = dbQueries.insertRatingsQuery(movieObj.Ratings, movieObj.imdbID);

        if (ratingsQuery) {
            const ratingsInsertedSuccesful = await db.executeQuery(ratingsQuery);

            if (!ratingsInsertedSuccesful.succesful) {
                res({ succesful: false, message: msg.DB_FAILED, status: 500 });
                return;
            }
        }

        res({ succesful: true, message: msg.CREATED, status: 201 });
        return;
    });
}

const postMoviesController = (req, res) => {
    let searchParameter, searchOption;

    if (req.swagger.params.body.value.title.trim()) {
        searchParameter = req.swagger.params.body.value.title;
        searchOption = "t";
    } else if (req.swagger.params.body.value.imdbID.trim()) {
        searchParameter = req.swagger.params.body.value.imdbID;
        searchOption = "i";
    } else {
        res.status(422).json({ message: msg.INCORRECT_DATA });
    }

    const postSuccesfull = asyncPostMoviesController(searchOption, searchParameter);

    postSuccesfull
        .then(postRes => {
            res.status(postRes.status).json({ message: postRes.message });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: msg.INT_SERVER_ERR });
        });
};

module.exports = postMoviesController;


