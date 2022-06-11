import mysql from 'mysql2';

//create connection pool
const pool = mysql.createPool(process.env.DATABASE_URL);

console.log(`\x1b[35m[MySQL]\x1b[0m connection pool created`);

export default pool;
