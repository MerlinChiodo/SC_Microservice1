import { Validator } from "jsonschema";
import { Refugee, NewRefugeeEvent, NewRefugeeFamilyEvent } from "./events.jsonschema.js";

export async function handleRefugeeEvent(event) {
    const v = new Validator();
    v.addSchema(Refugee, "/Refugee");

    //validate event
    const result = v.validate(event, NewRefugeeEvent);
    if (result.errors.length > 0) {
        console.error(`\x1b[36m[RabbitMQ]\x1b[0m Error while validating event \x1b[31;2m${event.event_name}\x1b[0m: ${result.errors}`);
        return;
    }

    //success
    console.log(`\x1b[36m[RabbitMQ]\x1b[0m event successful: \x1b[32;2m${event.event_name}\x1b[0m`);
}

export async function handleRefugeeFamilyEvent(event) {
    const v = new Validator();
    v.addSchema(Refugee, "/Refugee");

    //validate event
    const result = v.validate(event, NewRefugeeFamilyEvent);
    if (result.errors.length > 0) {
        console.error(`\x1b[36m[RabbitMQ]\x1b[0m Error while validating event \x1b[31;2m${event.event_name}\x1b[0m: ${result.errors}`);
        return;
    }

    //success
    console.log(`\x1b[36m[RabbitMQ]\x1b[0m event successful: \x1b[32;2m${event.event_name}\x1b[0m`);
}