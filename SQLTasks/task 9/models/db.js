const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'sharpener',
    password: 'Sharp@25',
    database: 'userDB'
});

module.exports = pool.promise();
