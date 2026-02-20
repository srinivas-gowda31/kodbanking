const mysql = require('mysql2/promise');

// Create connection pool for Vercel (serverless)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'kodbanking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
  // Important for Vercel: use connection pooling
  enableNetworkTimeoutOnConnectionReleaseMs: 0,
});

module.exports = pool;
