import mysql from 'mysql2/promise';

// Create a connection pool to connect to the MySQL database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || '13.201.237.105',
  user: process.env.MYSQL_USER || 'news1',
  password: process.env.MYSQL_PASSWORD || 'news1',
  database: process.env.MYSQL_DATABASE || 'soumya_news',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
