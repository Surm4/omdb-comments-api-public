const correctGetMovieRequestQueries = require('../helpers/correct_get_movies_queries');
const escapeMovieObject = require('./escape_movies_object');

const selectComments = (movieImdbID) => {
    if (movieImdbID) {
        movieImdbID = movieImdbID.replace(/\'/g, String.raw`\'`);
        return `SELECT * FROM COMMENTS WHERE COMMENTS.MovieImdbID = '${movieImdbID}'`;
    }
    return `SELECT * FROM COMMENTS`;
};

const insertCommentQuery = (commentObj) => {
    return `INSERT INTO COMMENTS (COMMENTS.ID, COMMENTS.MovieImdbID, COMMENTS.Comment, COMMENTS.Rating) 
    VALUES (NULL, '${commentObj.imdbID}', '${commentObj.Comment}', '${commentObj.Rating || "N/A"}')`;
};

const selectRatings = (movieImdbID) => {
    return `SELECT * FROM RATINGS WHERE RATINGS.MovieImdbID = '${movieImdbID}'`;
};

const selectMovies = (req) => {
    let query = `SELECT * FROM MOVIES`;

    Object.entries(req.query).filter(([key, value]) => correctGetMovieRequestQueries.includes(key)).forEach(([key, value], idx) => {
        if (idx === 0) {
            query += ` WHERE MOVIES.${key} = '${value}'`;
        } else {
            query += ` AND MOVIES.${key} = '${value}'`;
        }
    });

    return query;
};

const selectMovieWhereImdbID = (imdbID) => {
    return `SELECT MOVIES.imdbID FROM MOVIES WHERE MOVIES.imdbID = '${imdbID}'`;
};

const insertRatingsQuery = (ratings, movieImdbID) => {
    if ((!ratings || !ratings.length) || !movieImdbID) return;

    let query = `INSERT INTO RATINGS 
    (RATINGS.ID, RATINGS.Value, RATINGS.Source, RATINGS.MovieImdbID) 
    VALUES`;
    ratings.forEach((entr, idx, ratingsArr) => {
        query += `(NULL ,'${entr.Source}', '${entr.Value}', '${movieImdbID}')`;
        if (idx !== ratingsArr.length - 1) {
            query += `, `;
        }
    });

    return query;
};

const insertMovieQuery = (moviesApiResponse) => {
    return `INSERT INTO MOVIES 
        (MOVIES.Actors, MOVIES.Awards, MOVIES.BoxOffice, MOVIES.Country, MOVIES.DVD,MOVIES.Director, MOVIES.Genre, 
        MOVIES.Language, MOVIES.Metascore, MOVIES.Plot, MOVIES.Poster, MOVIES.Production, MOVIES.Rated, MOVIES.Released, MOVIES.Response, 
        MOVIES.Runtime, MOVIES.Title, MOVIES.Type, MOVIES.Website, MOVIES.Writer, MOVIES.Year, MOVIES.imdbID, MOVIES.imdbRating, MOVIES.imdbVotes) 
        VALUES('${moviesApiResponse.Actors}', '${moviesApiResponse.Awards}', '${moviesApiResponse.BoxOffice}', '${moviesApiResponse.Country}', 
        '${moviesApiResponse.DVD}','${moviesApiResponse.Director}', '${moviesApiResponse.Genre}', '${moviesApiResponse.Language}', 
        '${moviesApiResponse.Metascore}', '${moviesApiResponse.Plot}','${moviesApiResponse.Poster}', '${moviesApiResponse.Production}', 
        '${moviesApiResponse.Rated}', '${moviesApiResponse.Released}', '${moviesApiResponse.Response}','${moviesApiResponse.Runtime}', 
        '${moviesApiResponse.Title}', '${moviesApiResponse.Type}', '${moviesApiResponse.Website}', '${moviesApiResponse.Writer}','${moviesApiResponse.Year}', 
        '${moviesApiResponse.imdbID}', '${moviesApiResponse.imdbRating}', '${moviesApiResponse.imdbVotes}')`;
};

module.exports = {
    insertMovieQuery,
    insertRatingsQuery,
    selectMovieWhereImdbID,
    selectMovies,
    selectRatings,
    insertCommentQuery,
    selectComments
}