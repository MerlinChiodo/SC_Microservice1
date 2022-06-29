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
    //returns all open requests
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `SELECT Request.* FROM Request WHERE Request.status = "offen" AND Request.closed IS NULL AND Request.opened IS NOT NULL ORDER BY Request.opened ASC;`;
    let [results, fields] = await promisePool.execute(sql);
    if (results.length === 0) { return []; }

    const sql2 = `SELECT * FROM Citizen WHERE citizen_id = ?;`;
    const sql3 = `SELECT * FROM NewCitizenData WHERE citizen_id_new = ?;`;

    for (let index = 0; index < results.length; index++) {
        const request = results[index];

        //get old citizen data
        const [results2, fields2] = await promisePool.execute(sql2, [request.citizen_id]);
        if (results2.length === 0) { throw new Error("Could not get old citizen data"); }
        delete request.citizen_id;
        request.citizen_old = results2[0];

        //get new citizen data
        const [results3, fields3] = await promisePool.execute(sql3, [request.citizen_id_new]);
        if (results3.length === 0) { throw new Error("Could not get new citizen data"); }
        delete request.citizen_id_new;
        request.citizen_new = results3[0];
    }
    return results;
}

export async function approveRequest(request_id) {
    //mark request as approved
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `CALL ApproveRequest(?);`;
    const values = [request_id];
    const [results, fields] = await promisePool.execute(sql, values);
    return results.affectedRows > 0;
}

export async function rejectRequest(request_id) {
    //mark request as rejected
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `UPDATE Request SET status = 'abgelehnt', closed = NOW() WHERE request_id = ?;`;
    const values = [request_id];
    const [results, fields] = await promisePool.execute(sql, values);
    return results.affectedRows > 0;
}

export async function getRequestById(request_id) {
    //returns all information about request
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `SELECT * FROM Request WHERE request_id = ?;`;
    const [results, fields] = await promisePool.execute(sql, [request_id]);
    return results.length > 0 ? results[0] : null;
}

export async function deleteRequest(request_id) {
    //return true if deleted, false if not
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `DELETE FROM Request WHERE request_id = ?;`;
    const [results, fields] = await promisePool.execute(sql, [request_id]);
    return results.affectedRows > 0;
}
