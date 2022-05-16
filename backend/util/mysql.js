import mysql from 'mysql2';

//create connection pool
const pool = mysql.createPool(process.env.DATABASE_URL);

console.log('MySQL: connection pool created');

export default pool;
