import mysql from 'mysql2';

export default class MySQLWrapper {

    static #connectionString = process.env.DATABASE_URL;
    static pool = null;

    static createOrGetPool() {
        if (MySQLWrapper.pool === null) {
            MySQLWrapper.pool = mysql.createPool(MySQLWrapper.#connectionString);
            console.log(`\x1b[35m[MySQL]\x1b[0m connection pool created`);
        }
        return MySQLWrapper.pool;
    }

}

