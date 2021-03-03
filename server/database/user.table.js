const mysql = require('mysql');
const bcrypt = require('bcrypt');

const TABLE_NAME = 'users';
const SALT_ROUNDS = 10;

exports.initTable = (conn) => {
    conn.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        username VARCHAR(255) NOT NULL PRIMARY KEY,
        hashed_password VARCHAR(128) NOT NULL
    )`, (err, results, fields) => {
        if (err) 
            throw err;
    });
}

exports.addUser = (conn, username, plaintextPassword) => {
    conn.query(`SELECT * FROM ${TABLE_NAME} WHERE username='${username}'`, 
        (err, results, fields) => {
        if (err) 
            throw err;

        if (results.length > 0)
            return;  

        bcrypt.hash(plaintextPassword, SALT_ROUNDS, (err, hash) => {
            if (err) 
                throw err;

            conn.query(`INSERT INTO ${TABLE_NAME} VALUES (?, ?)`,
                [username, hash], 
                (err, results, fields) => {
                if (err)
                    throw err;
            });
        });
    });    
}
