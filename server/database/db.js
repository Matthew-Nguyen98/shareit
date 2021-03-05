const mysql = require('mysql');
const userTable = require('./user.table');
const config = require('../config/config');

// https://www.terlici.com/2015/08/13/mysql-node-express.html

let conn = null;

exports.connect = () => {
    return new Promise(function(resolve, reject) {
        try {
            conn = mysql.createConnection({
                host: config.sql.host,
                user: config.sql.user,
                password: config.sql.password,
                database: config.sql.database
            });

            resolve(this);
        } catch (e) {
            reject(e);
        }
    });
};

exports.initTables = () => {
    // Create all tables if they do not exist
    return new Promise(function(resolve, reject) {
        userTable.initTable(conn)
            .then(results => {
                console.log(results);
                resolve(results);
            }).catch(err => {
                reject(err);
            });
    });
};

exports.createUser = (username, password) => {
    return new Promise(function(resolve, reject) {
        userTable.addUser(conn, username, password)
            .then(results => {
                console.log(results);
                resolve(results);
            }).catch(err => {
                reject(err);
            });
    });
};

exports.close = () => {
    conn.end((err) => {
        if (err)
            throw err;
    })
}
