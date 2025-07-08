const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'scheduler_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export a promise-based pool so you can use async/await
module.exports = pool.promise();
