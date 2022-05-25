
/* -------------------------------------------------------------------------- */
/*                              requests.model.js                             */
/*                    handles the connection to the database                  */
/* -------------------------------------------------------------------------- */

export async function createRequest(citizen_id, reason, firstname, lastname, street, house_number, city_code, city) {
    //TODO save in database
    //create a new request in the database
    return { request_id: 1, citizen_id: citizen_id, reasoning: reason, citizen_id_new: 1, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' };
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
