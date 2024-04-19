/*
 * @Date: 2024-04-12 14:19:31
 * @Description: description
 */
const mysql = require('mysql2/promise');


(async function() {
    const pool  = mysql.createPool({
        host: '118.195.176.186',
        user: 'root',
        password: '325600',
        port: '28002',
        database: 'practice',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, 
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })
    const [results] = await pool.query('select * from customers');
    console.log(results);
})();
