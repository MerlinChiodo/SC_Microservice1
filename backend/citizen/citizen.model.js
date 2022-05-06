import pool from '../util/mysql.js';

/* -------------------------------------------------------------------------- */
/*                              citizen.model.js                              */
/*                    handles the connection to the database                  */
/* -------------------------------------------------------------------------- */

/**
 * creates a new citizen in the database  
 * assumes all fields are properly set in the object
 * @param {Object} citizen_input
 * @returns {int} the id of the new citizen
*/
export async function createCitizen(citizen) {
    const promisePool = pool.promise();
    const sql = `INSERT INTO Citizen(firstname, lastname, gender, birthname, place_of_birth, birthdate, email, street, housenumber, city_code, city)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [
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
    return parseInt(results.insertId);
}

/**
 * gets a citizen from the database
 * @param {string|int} citizen_id
 * @returns {Object} the citizen or null
 */
export async function getCitizenById(citizen_id) {
    const promisePool = pool.promise();
    const sql = `SELECT * FROM Citizen WHERE citizen_id = ? LIMIT 1;`;
    const [rows, fields] = await promisePool.execute(sql, [citizen_id]);
    return rows.length > 0 ? rows[0] : null;
};

/**
 * gets all child ids for a given citizen
 * @param {string|int} citizen_id 
 * @returns {Array} the child ids
 */
export async function getChildrenIds(citizen_id) {
    //TODO get children from database
    return [];
}

/**
 * checks if a citizen has a proof of competence for dogowners
 * @param {string|int} citizen_id 
 * @returns {bool} whether or not the citizen has dog permit
 */
export async function hasDogPermit(citizen_id) {
    //TODO check if citizen has a proof of competence for dogowners
    return false;
}

/**
 * gets the id of the spouse of a citizen
 * @param {string|int} citizen_id 
 * @returns {int|null} the spouse id or null
 */
export async function getSpouseId(citizen_id) {
    //TODO get spouse id from database
    return null;
}
