import { Validator } from "jsonschema";
import { Refugee, NewRefugeeEvent, NewRefugeeFamilyEvent } from "./events.jsonschema.js";
import { createCitizen } from "../citizen/citizen.model.js";
// import { createCitizen } from "./events.model.js";
import RabbitMQWrapper from "./rabbitmq.js";
import CitizenCreatedEvent from "./events/CitizenCreatedEvent.js";

export async function handleRefugeeEvent(event) {
    const v = new Validator();
    v.addSchema(Refugee, "/Refugee");

    //validate event
    const result = v.validate(event, NewRefugeeEvent);
    if (result.errors.length > 0) {
        RabbitMQWrapper.error(`Error while validating event \x1b[31;2m${event.event_name}\x1b[0m: ${result.errors}`);
        return;
    }

    //event is valid
    const citizen = {
        firstname: event.refugee.firstname, lastname: event.refugee.lastname, birthdate: event.refugee["date of birth"], email: event.refugee.email
    }

    //try to create citizen
    let citizen_id;
    try {
        citizen_id = await createCitizen(citizen);
        RabbitMQWrapper.log(`created citizen with id \x1b[32;2m${citizen_id}\x1b[0m`);
    } catch (error) {
        RabbitMQWrapper.error(`Error while creating citizen: ${error}`);
        return;
    }

    //send new citizen event
    try {
        RabbitMQWrapper.publish(new CitizenCreatedEvent(citizen_id));
    } catch (error) {
        RabbitMQWrapper.error(`Error while sending CitizenCreatedEvent: ${error}`);
        return;
    }

    //success
    RabbitMQWrapper.log(`event successful: \x1b[32;2m${event.event_name}`);
}

export async function handleRefugeeFamilyEvent(event) {
    const v = new Validator();
    v.addSchema(Refugee, "/Refugee");

    //validate event
    const result = v.validate(event, NewRefugeeFamilyEvent);
    if (result.errors.length > 0) {
        RabbitMQWrapper.error(`Error while validating event \x1b[31;2m${event.event_name}\x1b[0m: ${result.errors}`);
        return;
    }

    //success
    RabbitMQWrapper.log(`event successful: \x1b[32;2m${event.event_name}`);
}