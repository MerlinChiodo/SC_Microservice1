import * as permitModel from './permits.model.js'
import { validate } from 'jsonschema';
import { NewPermitSchema, UpdatePermitSchema, PermitID } from './permits.jsonschema.js';

export async function createPermit(request, response) {
    //validate posted parameters
    const input = request.body;
    const result = validate(input, NewPermitSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //create permit in database
    let permit;
    try {
        permit = await permitModel.createPermit(input.title, input.description || null);
        if (permit == null) { return response.status(400).json({ errors: ['Could not create permit'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not create permit'] });
    }

    //send response
    response.status(200).json({ permit: permit });
};

export async function getPermitById(request, response) {
    //validate permit_id from url parameters
    const permit_id = request.params.id;
    const result = validate(permit_id, PermitID);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //get permit from database
    let permit;
    try {
        permit = await permitModel.getPermitById(permit_id);
        if (permit == null) { return response.status(404).json({ errors: ['Permit was not found.'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get permit from database'] });
    }

    //send response
    response.status(200).json({ permit: permit });
};

export async function updatePermit(request, response) {
    //validate permit_id from url parameters
    const permit_id = request.params.id;
    const result1 = validate(permit_id, PermitID);
    if (result1.errors.length > 0) {
        let errors = result1.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }
    //validate posted parameters
    const input = request.body;
    const result2 = validate(input, UpdatePermitSchema);
    if (result2.errors.length > 0) {
        let errors = result2.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //update permit in database
    let permit;
    try {
        permit = await permitModel.updatePermit(permit_id, input.title, input.description || null);
        if (permit == null) { return response.status(400).json({ errors: ['Could not update permit'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not update permit'] });
    }

    //send response
    response.status(200).json({ permit: permit });
};

export async function deletePermit(request, response) {
    //validate permit_id from url parameters
    const permit_id = request.params.id;
    const result = validate(permit_id, PermitID);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //delete permit from database
    let success;
    try {
        success = await permitModel.deletePermit(permit_id);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not delete permit'] });
    }

    //send response
    response.status(200).json({ deleted: success });
};