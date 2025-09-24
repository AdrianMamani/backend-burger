const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'turntable.proxy.rlwy.net', // Or your Railway host
    user: 'root',
    password: 'qndLLhvrosYDMKcykXtAnDoGxMbsuuux', // Replace with your password
    database: 'railway',
    port: 52510
});

module.exports = pool;