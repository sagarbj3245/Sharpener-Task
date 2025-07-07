const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'testDB'
});

connection.connect (err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to the database!');

    const createQuery = `CREATE TABLE Students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20)
    )`

    connection.execute(createQuery, (err) => {
        if (err) {
            console.error(err);
            connection.end();
            return;
        }
        console.log('Table created successfully!');
    });
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});