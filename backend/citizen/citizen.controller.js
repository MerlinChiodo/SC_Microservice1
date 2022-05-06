import { validate } from 'jsonschema';
import NewCitizenSchema from './citizen.jsonschema.js';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import CitizenCreatedEvent from '../rabbitmq/events/CitizenCreatedEvent.js';

/* -------------------------------------------------------------------------- */
/*                          citizen.controller.js                             */
/*             validates the given input and gathers the output               */
/* -------------------------------------------------------------------------- */

/**
 * validates the request body against the jsonschema  
 * creates new citizen in the database  
 * sends an event via rabbitmq  
 * sends response to client
 */
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
    let citizen_id
    try {
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
    const result = validate(citizen_id, { type: 'string', "pattern": "^[1-9]\d*$" });
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ errors: errors });
    }

    //TODO get and check permissions from smartauth

    // get citizen from database
    let citizen;
    try {
        citizen = await request.citizenModel.getCitizenById(citizen_id);
        if (citizen === null) {
            return response.status(404).json({ errors: ['Citizen was not found.'] });
        }
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
        spouse_id: null,
        child_ids: [],
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
    const result = validate(citizen_id, { type: 'string', "pattern": "^[1-9]\d*$" });
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        response.status(400).json({ errors: errors });
        return;
    }

    //TODO get and check permissions from smartauth

    //TODO get children ids from database
    const children = [];

    // send response
    response.status(200).json({ citizen_id: citizen_id, children: children });
}

export async function hasDogPermit(request, response) {
    // validate citizen_id from url parameters
    const citizen_id = request.params.id;
    const result = validate(citizen_id, { type: 'string', "pattern": "^[1-9]\d*$" });
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        response.status(400).json({ errors: errors });
        return;
    }

    //TODO get and check permissions from smartauth

    //TODO check if citizen has proof of competence for dogowners

    // send response
    response.status(200).json({ citizen_id: citizen_id, has_dog_permit: false });
}
