const db = require('../../db/db');
const dbQueries = require('../helpers/db_queries');
const msg = require('../helpers/messages');

const asyncGetCommentsController = (req) => {
    return new Promise(async (res, rej) => {

        const getComments = await db.executeQuery(dbQueries.selectComments(req.swagger.params.imdbID.value));

        if (!getComments.succesful) {
            res({ succesful: false, message: msg.DB_FAILED, status: 500 });
            return;
        }

        if (!getComments.data.length) {
            res({ succesful: false, message: msg.NO_COMMENTS, status: 409 });
            return;
        }

        const result = getComments.data.map(comment => ({ ...comment }));

        res({ succesful: true, message: msg.SELECTED, status: 200, data: result });
        return;
    });
};

const getCommentsController = (req, res) => {
    asyncGetCommentsController(req)
        .then(commRes => {
            if (commRes.status === 200) {
                res.status(commRes.status).json(commRes.data);
            } else {
                res.status(commRes.status).json({ message: commRes.message });
            }
        })
        .catch(err => {
            res.status(500).json({ message: msg.INT_SERVER_ERR });
        });
};

module.exports = getCommentsController;