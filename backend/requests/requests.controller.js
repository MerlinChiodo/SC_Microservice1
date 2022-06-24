import { validate } from 'jsonschema';
import { NewRequestSchema, RequestIDSchema } from './requests.jsonschema.js';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import CitizenDataChangeEvent from '../rabbitmq/events/CitizenDataChangeEvent.js';

/* -------------------------------------------------------------------------- */
/*                          requests.controller.js                            */
/*             validates the given input and gathers the output               */
/* -------------------------------------------------------------------------- */

export async function createRequest(request, response) {
    //validate posted parameters
    const input = request.body;
    const result = validate(input, NewRequestSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //create request in database
    let request_out;
    try {
        request_out = await request.requestModel.createRequest(input.citizen_id, input.reason || null, input.firstname || null, input.lastname || null, input.street || null, input.housenumber || null, input.city_code || null, input.city || null);
        if (request_out == null) { return response.status(400).json({ errors: ['Could not create request'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not create request'] });
    }

    //send response
    response.status(200).json({ request: request_out });
};

export async function getAllOpenRequests(request, response) {
    //get all open requests from database
    let requests;
    try {
        requests = await request.requestModel.getAllOpenRequests();
        if (requests == null) { return response.status(404).json({ errors: ['No open requests found.'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get open requests from database'] });
    }

    //check if there are any requests
    if (!Array.isArray(requests)) { return response.status(500).json({ errors: ['Could not get open requests from database'] }); }

    //send response
    response.status(200).json({ requests: requests });
};

export async function approveRequest(request, response) {
    //validate parameters from body
    const request_id = request.params.id;
    const result = validate(request_id, RequestIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //approve request in database
    let success;
    try {
        success = await request.requestModel.approveRequest(request_id);
        if (!success) { return response.status(400).json({ errors: ['Could not approve request'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not approve request'] });
    }

    //send rabbitmq message
    try {
        const oldRequest = await request.requestModel.getRequestById(request_id);
        if (success && oldRequest != null) {
            await RabbitMQWrapper.publish(new CitizenDataChangeEvent(oldRequest.citizen_id));
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not send rabbitmq message'] });
    }

    //send response
    response.status(200).json({ success: success });
};

export async function rejectRequest(request, response) {
    //validate parameters from body
    const request_id = request.params.id;
    const result = validate(request_id, RequestIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //reject request in database
    let success;
    try {
        success = await request.requestModel.rejectRequest(request_id);
        if (!success) { return response.status(400).json({ errors: ['Could not reject request'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not reject request'] });
    }

    //send response
    response.status(200).json({ success: success });
};

export async function getRequestById(request, response) {
    //validate parameters from body
    const request_id = request.params.id;
    const result = validate(request_id, RequestIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //get request from database
    let request_out;
    try {
        request_out = await request.requestModel.getRequestById(request_id);
        if (request_out == null) { return response.status(404).json({ errors: ['Request not found.'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get request from database'] });
    }

    //send response
    response.status(200).json({ request: request_out });
};

export async function deleteRequest(request, response) {
    //validate parameters from body
    const request_id = request.params.id;
    const result = validate(request_id, RequestIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //delete request from database
    let success;
    try {
        success = await request.requestModel.deleteRequest(request_id);
        if (!success) { return response.status(400).json({ errors: ['Could not delete request'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not delete request'] });
    }

    //send response
    response.status(200).json({ success: success });
};
