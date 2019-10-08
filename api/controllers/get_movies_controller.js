const db = require('../../db/db');
const dbQueries = require('../helpers/db_queries');
const msg = require('../helpers/messages');

const asyncGetMoviesController = (req) => {
    return new Promise(async (res, rej) => {
        let getMovies = [];
        const moviesQuery = await db.executeQuery(dbQueries.selectMovies(req));

        if (!moviesQuery.succesful || !moviesQuery.data.length) {
            res({ succesful: false, message: msg.DB_FAILED, status: 500 });
            return;
        }

        const newMovie = async (movie) => {
            movie = { ...movie };
            const ratingsQuery = await db.executeQuery(dbQueries.selectRatings(movie.imdbID));
            if (!ratingsQuery.succesful) {
                res({ succesful: false, message: msg.DB_FAILED, status: 500 });
                return;
            }

            ratingsQuery.data = ratingsQuery.data.map(rtng => ({ ...rtng }));

            if (ratingsQuery.data.length) {
                movie.Ratings = ratingsQuery.data;
            } else {
                movie.Ratings = [];
            }

            await getMovies.push(movie);
        };

        await Promise.all(moviesQuery.data.map(newMovie));

        const result = getMovies;

        res({ succesful: true, message: msg.SELECTED, status: 200, data: result });
        return;
    });
};

const getMoviesController = (req, res) => {

    asyncGetMoviesController(req)
        .then(getRes => {
            if (getRes.status === 200) {
                res.status(200).json(getRes.data);
            } else {
                res.status(getRes.status).json({ message: getRes.message });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: msg.INT_SERVER_ERR });
        });

};

module.exports = getMoviesController;
