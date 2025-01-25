import mysql from 'mysql2/promise'
import 'dotenv/config'

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

export default async function postData(name, address) {
    let connection
    try {
        connection = await pool.getConnection()
        const sql = `INSERT INTO user_data (name, address) VALUES (?, ?)`
        const [result] = await connection.query(sql, [name, address]);
        console.log(result);
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

