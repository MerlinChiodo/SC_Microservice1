import pool from '../util/mysql.js';

/* -------------------------------------------------------------------------- */
/*                              citizen.model.js                              */
/*                    handles the connection to the database                  */
/* -------------------------------------------------------------------------- */

/**
 * creates a new citizen in the database  
 * assumes all fields are properly set in the object
 * @param {Object} citizen_input
 * @returns {string} the id of the new citizen
*/
export async function createCitizen(citizen) {
    const promisePool = pool.promise();
    const sql = `INSERT INTO CITIZEN(CITIZEN_ID, FIRSTNAME, LASTNAME, GENDER, BIRTHNAME, PLACE_OF_BIRTH, BIRTHDATE, EMAIL, STREET, HOUSENUMBER, CITY_CODE, CITY)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [
        citizen.citizen_id,
        citizen.firstname,
        citizen.lastname,
        citizen.gender,
        citizen.birthname || null,
        citizen.place_of_birth || null,
        citizen.birthdate,
        citizen.email || null,
        citizen.street,
        citizen.housenumber,
        citizen.city_code,
        citizen.city
    ];
    const [results, fields] = await promisePool.execute(sql, values);
    if (results.affectedRows === 0) {
        throw new Error('Could not create citizen');
    }
}

/**
 * gets a citizen from the database
 * @param {string} citizen_id
 * @returns {Object} the citizen or null
 */
export async function getCitizenById(id) {
    const promisePool = pool.promise();
    const sql = `SELECT * FROM CITIZEN WHERE CITIZEN_ID = ? LIMIT 1;`;
    const [rows, fields] = await promisePool.execute(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
};