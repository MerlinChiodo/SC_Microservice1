import MySQLWrapper from "../util/mysql.js";

/* -------------------------------------------------------------------------- */
/*                              permits.model.js                              */
/*                  handles the connection to the database                    */
/* -------------------------------------------------------------------------- */

export async function createPermit(title, description) {
    //create a new permit in the database and return it
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `INSERT INTO Permit(title, description) VALUES (?, ?);`;
    const [results, fields] = await promisePool.execute(sql, [title, description]);
    if (results.affectedRows === 0) {
        return null;
    }
    return { permit_id: parseInt(results.insertId), title: title, description: description };
};

export async function getPermitById(permit_id) {
    //returns all information about permit
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `SELECT * FROM Permit WHERE permit_id = ? LIMIT 1;`;
    const [rows, fields] = await promisePool.execute(sql, [permit_id]);
    return rows.length > 0 ? rows[0] : null;
};

export async function updatePermit(permit_id, title, description) {
    //if description is null, only update title
    //returns the updated permit
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    let sql = `UPDATE Permit SET title = ?, description = ? WHERE permit_id = ?;`;
    let values = [title, description, permit_id];
    if (description === null) {
        sql = `UPDATE Permit SET title = ? WHERE permit_id = ?;`;
        values = [title, permit_id];
    }
    const [results, fields] = await promisePool.execute(sql, values);
    if (results.affectedRows === 0) {
        return null;
    }
    return getPermitById(permit_id);
};

export async function deletePermit(permit_id) {
    //return true if deleted, false if not
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `DELETE FROM Permit WHERE permit_id = ?;`;
    const [results, fields] = await promisePool.execute(sql, [permit_id]);
    return results.affectedRows > 0;
};

export async function getAllPermits() {
    //returns all permits
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `SELECT * FROM Permit;`;
    const [rows, fields] = await promisePool.execute(sql);
    return rows;
};

export async function createPermitRequest(permit_id, citizen_id, description) {
    //create a new permit request in the database
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `INSERT INTO Permits (permit_id, citizen_id, description, processed) VALUES (?, ?, ?, 0);`;
    const values = [permit_id, citizen_id, description];
    const [results, fields] = await promisePool.execute(sql, values);
    if (results.affectedRows === 0) {
        return false;
    }
    return true;
};

export async function getAllOpenPermitRequests() {
    //returns all open permit requests
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `SELECT
                        Permits.permits_id,
                        Citizen.firstname,
                        Citizen.lastname,
                        Permit.title,
                        Permits.description as reason,
                        Permit.description
                    FROM Permits
                    JOIN Permit ON Permit.permit_id = Permits.permit_id
                    JOIN Citizen ON Citizen.citizen_id = Permits.citizen_id
                    WHERE Permits.processed = 0
                    ORDER BY Permits.permits_id ASC;`;
    const [rows, fields] = await promisePool.execute(sql);
    return rows.length > 0 ? rows : [];
};

export async function approvePermitRequest(permits_id, valid_until) {
    //mark permit request as approved 
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `UPDATE Permits SET date_of_issue = NOW(), valid_until = ?, processed = 1 WHERE permits_id = ?;`;
    const values = [valid_until, permits_id];
    const [results, fields] = await promisePool.execute(sql, values);
    if (results.affectedRows === 0) {
        return false;
    }
    return true;
};

export async function rejectPermitRequest(permits_id,) {
    //mark permit request as rejected
    const promisePool = MySQLWrapper.createOrGetPool().promise();
    const sql = `UPDATE Permits SET processed = 1 WHERE permits_id = ?;`;
    const values = [permits_id];
    const [results, fields] = await promisePool.execute(sql, values);
    if (results.affectedRows === 0) {
        return false;
    }
    return true;
};
