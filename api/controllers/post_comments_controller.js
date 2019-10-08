const db = require('../../db/db');
const dbQueries = require('../helpers/db_queries');
const escapeMovieObject = require('../helpers/escape_movies_object');
const msg = require('../helpers/messages');

const asyncpostCommentsController = (req) => {
    return new Promise(async (res, rej) => {
        const commentObj = escapeMovieObject(req.swagger.params.body.value);

        const checkIfMovieExists = await db.executeQuery(dbQueries.selectMovieWhereImdbID(commentObj.imdbID));

        if (!checkIfMovieExists.succesful || !checkIfMovieExists.data.length) {
            res({ succesful: false, message: msg.MOVIEID_NOT_EXIST, status: 409 });
            return;
        }

        // console.log(dbQueries.insertCommentQuery(commentObj));

        const insertCommentQuery = await db.executeQuery(dbQueries.insertCommentQuery(commentObj));

        if (!insertCommentQuery.succesful) {
            res({ succesful: false, message: msg.DB_FAILED, status: 500 });
            return;
        }

        res({ succesful: true, message: msg.CREATED, status: 201 });
        return;
    });
};

const postCommentsController = (req, res) => {
    asyncpostCommentsController(req)
        .then(commRes => {
            res.status(commRes.status).json({ message: commRes.message });
        })
        .catch(err => {
            res.status(500).json({ message: msg.INT_SERVER_ERR });
        });
};

module.exports = postCommentsController;