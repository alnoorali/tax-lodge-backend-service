const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});

// Check if the connection is successful
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to mysql:', err);
        return;
    }
    console.log('Connected to mysql: node database');
    connection.release(); // Release the connection
});

module.exports = pool.promise();