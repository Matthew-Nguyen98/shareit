const bcrypt = require('bcrypt');

const TABLE_NAME = 'users';
const SALT_ROUNDS = 10;

exports.initTable = (conn) => {
    return new Promise(function(resolve, reject) {
        conn.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            username VARCHAR(255) NOT NULL PRIMARY KEY,
            hashed_password VARCHAR(128) NOT NULL
        )`, (err, results, fields) => {
            if (err) 
                return reject(err);
            resolve(results);
        });
    });
}

exports.addUser = (conn, username, plaintextPassword) => {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(plaintextPassword, SALT_ROUNDS, (err, hash) => {
            if (err) 
                return reject(err);

            conn.query(`INSERT IGNORE INTO ${TABLE_NAME} VALUES (?, ?)`,
                [username, hash], 
                (err, results, fields) => {
                if (err)
                    return reject(err);
                resolve(results);
            });
        });
    });
}
