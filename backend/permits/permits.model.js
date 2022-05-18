
export async function createPermit(title, description) {
    //TODO save in database
    //create a new permit in the database and return it
    return { permit_id: 1, title: title, description: description };
};

export async function getPermitById(permit_id) {
    //TODO get from database
    //returns all information about permit
    return { permit_id: permit_id, title: 'Titel 1', description: 'Beschreibung 1' };
};

export async function updatePermit(permit_id, title, description) {
    //TODO update in database
    //if description is null, only update title
    //returns the updated permit
    return { permit_id: permit_id, title: title, description: description };
};

export async function deletePermit(permit_id) {
    //TODO delete in database
    //return true if deleted, false if not
    return true;
};

export async function createPermitRequest(citizen_id, permit_id) {
    //TODO save in database
    //create a new permit request in the database
    return true;
};

export async function getAllOpenPermitRequests() {
    //TODO get from database
    //returns all open permit requests
    return [{ citizen_id: 1, permit_id: 1, status: 'offen' }, { citizen_id: 2, permit_id: 2, status: 'offen' }];
};

export async function approveOrRejectPermitRequest(permit_id, citizen_id, status, valid_until = null) {
    //TODO update in database
    //mark permit request as approved or rejected
    //if approved add permit to citizen's permit list
    return true;
};
