import MySQLWrapper from "../util/mysql.js";

/* -------------------------------------------------------------------------- */
/*                              requests.model.js                             */
/*                    handles the connection to the database                  */
/* -------------------------------------------------------------------------- */

export async function createRequest(citizen_id, reason, firstname, lastname, street, house_number, city_code, city) {
    //create the new citizen data
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `INSERT INTO NewCitizenData(firstname, lastname, street, housenumber, city_code, city) VALUES (?, ?, ?, ?, ?, ?);`;
    const values = [firstname, lastname, street, house_number, city_code, city];
    const [results, fields] = await promisePool.execute(sql, values);
    const citizen_id_new = results.insertId;

    //create a new request and link it to the new citizen data
    const sql2 = `INSERT INTO Request(citizen_id, citizen_id_new, opened, status, reasoning) VALUES (?, ?, NOW(), 'offen', ?);`;
    const values2 = [citizen_id, citizen_id_new, reason];
    const [results2, fields2] = await promisePool.execute(sql2, values2);
    const request_id = results2.insertId;

    //return the new request
    const sql3 = `SELECT * FROM Request WHERE request_id = ?;`;
    const [results3, fields3] = await promisePool.execute(sql3, [request_id]);
    return results3.length > 0 ? results3[0] : null;
}

export async function getAllOpenRequests() {
    //TODO get from database
    //returns all open requests
    return [
        { request_id: 1, citizen_id: 1, reasoning: 'Beschreibung 1', citizen_id_new: 1, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' },
        { request_id: 2, citizen_id: 2, reasoning: 'Beschreibung 2', citizen_id_new: 2, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' }
    ];
}

export async function approveRequest(request_id) {
    //TODO update in database
    //change citizen data
    //mark request as approved
    return true;
}

export async function rejectRequest(request_id) {
    //TODO update in database
    //mark request as rejected
    return true;
}

export async function getRequestById(request_id) {
    //TODO get from database
    //returns all information about request
    return { request_id: request_id, citizen_id: 1, reasoning: 'Beschreibung 1', citizen_id_new: 1, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' };
}

export async function deleteRequest(request_id) {
    //TODO delete in database
    //return true if deleted, false if not
    return true;
}
