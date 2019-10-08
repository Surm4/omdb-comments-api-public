const mysql = require('mysql');
const dotenv = require('dotenv').config(); 
 
const executeQuery = async (apiQuery) => {
    let succesful = true;
    let data = [];

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    });

    const c = () => {
        return new Promise((res, rej) => {
            connection.connect((err) => {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    succesful = false;
                    res(succesful);
                    return;
                }
                res();
            });
        });
    };
    
    const q = () => {
        return new Promise((res, rej) => {
            connection.query(apiQuery, (err, results, fields) => {
                if (err) {
                    console.log(err)
                    succesful = false;
                    res(succesful)
                    return;
                };

                data = results;
                res(results);
            });
        });
    };

    const e = () => {
        return new Promise((res, rej) => {
            connection.end((err) => {
                if (err) {
                    console.log(err)
                    connection.destroy();
                    succesful = false;
                    res(succesful);
                    return;
                };
                res();
            });
        });
    };

    await c();
    await q(apiQuery);
    await e();

    return {
        succesful,
        data
    };
}

module.exports = {
    executeQuery
}