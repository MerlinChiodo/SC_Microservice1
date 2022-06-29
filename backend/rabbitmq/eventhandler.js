import { Validator } from "jsonschema";
import { Refugee, NewRefugeeEvent, NewRefugeeFamilyEvent } from "./events.jsonschema.js";
import { createCitizen, saveCustody } from "../citizen/citizen.model.js";
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
        firstname: event.refugee.firstname, lastname: event.refugee.lastname, birthdate: event.refugee.date_of_birth.slice(0, 10), email: event.refugee.email
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

    //try saving parents
    let parent_ids = [];
    try {
        for (let index = 0; index < event.parents.length; index++) {
            const parent = event.parents[index];
            const citizen = {
                firstname: parent.firstname, lastname: parent.lastname, birthdate: parent.date_of_birth.slice(0, 10), email: parent.email
            }
            const parent_id = await createCitizen(citizen);
            parent_ids.push(parent_id);
            RabbitMQWrapper.publish(new CitizenCreatedEvent(parent_id));

        }
    } catch (error) {
        return RabbitMQWrapper.error(`Error while saving parents: ${error}`);
    }

    //try saving children
    let child_ids = [];
    try {
        for (let index = 0; index < event.children.length; index++) {
            const child = event.children[index];
            const citizen = {
                firstname: child.firstname, lastname: child.lastname, birthdate: child.date_of_birth.slice(0, 10), email: child.email
            }
            const child_id = await createCitizen(citizen);
            child_ids.push(child_id);
            RabbitMQWrapper.publish(new CitizenCreatedEvent(child_id));
        }
    } catch (error) {
        return RabbitMQWrapper.error(`Error while saving children: ${error}`);
    }

    //try saving relationship
    try {
        for (let i = 0; i < parent_ids.length; i++) {
            const parent_id = parent_ids[i];
            for (let j = 0; j < child_ids.length; j++) {
                const child_id = child_ids[j];
                await saveCustody(parent_id, child_id);
            }
        }
    } catch (error) {
        return RabbitMQWrapper.error(`Error while saving relationship: ${error}`);
    }

    //success
    RabbitMQWrapper.log(`saved ${child_ids.length} children and ${parent_ids.length} parents`);
    RabbitMQWrapper.log(`event successful: \x1b[32;2m${event.event_name}`);
}