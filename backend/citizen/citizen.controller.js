import { validate } from 'jsonschema';
import { NewCitizenSchema, CitizenIDSchema } from './citizen.jsonschema.js';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import CitizenCreatedEvent from '../rabbitmq/events/CitizenCreatedEvent.js';
import SmartAuth from '../util/smartauth.js';

/* -------------------------------------------------------------------------- */
/*                          citizen.controller.js                             */
/*             validates the given input and gathers the output               */
/* -------------------------------------------------------------------------- */

export async function createCitizen(request, response) {
    //TODO authenticate that request was sent from our site

    // validate request body
    const citizen_input = request.body;
    const result = validate(citizen_input, NewCitizenSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ citizen_created: false, errors: errors });
    }

    // create citizen in database
    let citizen_id;
    try {
        // split birthdate to get only YYYY-MM-DD | react datepicker returns YYYY-MM-DDTHH:mm:ss.SSSZ
        citizen_input.birthdate = citizen_input.birthdate.split('T')[0];
        citizen_id = await request.citizenModel.createCitizen(citizen_input);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ citizen_created: false, errors: ['Could not create citizen'] });
    }

    // send event via rabbitmq
    try {
        RabbitMQWrapper.publish(new CitizenCreatedEvent(citizen_id));
    } catch (error) {
        console.error(error);
        return response.status(500).json({ citizen_created: true, errors: ['Error whilst connecting to RabbitMQ'] });
    }

    // send response
    response.status(201).json({ citizen_created: true, citizen_id: citizen_id });
};

export async function getCitizenById(request, response) {
    // validate citizen_id from url parameters
    const citizen_id = request.params.id;
    const result = validate(citizen_id, CitizenIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //get and check permissions from smartauth
    try {
        let permission = await SmartAuth.getPermissions(citizen_id);
        if (!permission) {
            return response.status(403).json({ errors: ['You do not have permission to view this citizen'] });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get permissions'] });
    }

    // get citizen from database
    let citizen, spouse_id, children_ids;
    try {
        citizen = await request.citizenModel.getCitizenById(citizen_id);
        if (citizen === null) {
            return response.status(404).json({ errors: ['Citizen was not found.'] });
        }
        spouse_id = await request.citizenModel.getSpouseId(citizen_id);
        children_ids = await request.citizenModel.getChildrenIds(citizen_id);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get citizen from database'] });
    }

    // TODO remove values that the client is not allowed to see
    const citizen_output = {
        citizen_id: citizen.citizen_id,
        firstname: citizen.firstname,
        lastname: citizen.lastname,
        gender: citizen.gender,
        birthdate: citizen.birthdate,
        place_of_birth: citizen.place_of_birth,
        birthname: citizen.birthname,
        email: citizen.email,
        spouse_id: spouse_id,
        child_ids: children_ids,
        address: {
            street: citizen.street,
            housenumber: citizen.housenumber,
            city_code: citizen.city_code,
            city: citizen.city
        }
    };

    // send response
    return response.status(200).json(citizen_output);
};

export async function getChildren(request, response) {
    // validate citizen_id from url parameters
    const citizen_id = request.params.id;
    const result = validate(citizen_id, CitizenIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        response.status(400).json({ errors: errors });
        return;
    }

    //get and check permissions from smartauth
    try {
        let permission = await SmartAuth.getPermissions(citizen_id);
        if (!permission) {
            return response.status(403).json({ errors: ['You do not have permission to view this citizen'] });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get permissions'] });
    }

    //get children from database
    let children;
    try {
        children = await request.citizenModel.getChildrenIds(citizen_id);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get children from database'] });
    }

    // send response
    response.status(200).json({ citizen_id: parseInt(citizen_id), children: children });
}

export async function hasDogPermit(request, response) {
    // validate citizen_id from url parameters
    const citizen_id = request.params.id;
    const result = validate(citizen_id, CitizenIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        response.status(400).json({ errors: errors });
        return;
    }

    //get and check permissions from smartauth
    try {
        let permission = await SmartAuth.getPermissions(citizen_id);
        if (!permission) {
            return response.status(403).json({ errors: ['You do not have permission to view this citizen'] });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get permissions'] });
    }

    //check if citizen has dog permit
    let hasDogPermit;
    try {
        hasDogPermit = await request.citizenModel.hasDogPermit(citizen_id);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get dog permits from database'] });
    }

    // send response
    response.status(200).json({ citizen_id: parseInt(citizen_id), hasDogPermit: hasDogPermit });
}

export async function getPermits(request, response) {
    // validate citizen_id from url parameters
    const citizen_id = request.params.id;
    const result = validate(citizen_id, CitizenIDSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        response.status(400).json({ errors: errors });
        return;
    }

    //get and check permissions from smartauth
    try {
        let permission = await SmartAuth.getPermissions(citizen_id);
        if (!permission) {
            return response.status(403).json({ errors: ['You do not have permission to view the permits of this citizen'] });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get permissions'] });
    }

    //get permits from database
    let permits = [];
    try {
        permits = await request.citizenModel.getPermits(citizen_id);
        if (permits === null) { return response.status(404).json({ errors: ['Citizen was not found.'] }); }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ errors: ['Could not get permits from database'] });
    }

    // send response
    response.status(200).json({ citizen_id: parseInt(citizen_id), permits: permits });
};
