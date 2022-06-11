import { Validator } from "jsonschema";
import { Refugee, NewRefugeeEvent, NewRefugeeFamilyEvent } from "./events.jsonschema.js";
import RabbitMQWrapper from "./rabbitmq.js";

export async function handleRefugeeEvent(event) {
    const v = new Validator();
    v.addSchema(Refugee, "/Refugee");

    //validate event
    const result = v.validate(event, NewRefugeeEvent);
    if (result.errors.length > 0) {
        RabbitMQWrapper.error(`Error while validating event \x1b[31;2m${event.event_name}\x1b[0m: ${result.errors}`);
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