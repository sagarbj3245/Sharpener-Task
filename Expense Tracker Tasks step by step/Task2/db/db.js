const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'expensetracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('DB connected: ', results[0].solution);
  }
});
module.exports = pool;
