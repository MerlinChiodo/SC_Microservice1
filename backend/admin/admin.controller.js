import { validate } from 'jsonschema';
import { ChangeAboutusSchema } from './admin.jsonschema.js';
import AboutUsChangeEvent from '../rabbitmq/events/AboutUsChangeEvent.js';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';

/* -------------------------------------------------------------------------- */
/*                          admin.controller.js                               */
/*             validates the given input and gathers the output               */
/* -------------------------------------------------------------------------- */

export async function changeAboutus(request, response) {
    //validate request body
    const body = request.body;
    const result = validate(body, ChangeAboutusSchema);
    if (result.errors.length > 0) {
        let errors = result.errors.map(error => error.stack);
        return response.status(400).json({ aboutus_changed: false, errors: errors });
    }

    //send event via rabbitmq
    try {
        RabbitMQWrapper.publish(new AboutUsChangeEvent(body.link, body.aboutus, body.image));
    } catch (error) {
        console.error(error);
        return response.status(500).json({ aboutus_changed: false, errors: ['Error whilst connecting to RabbitMQ'] });
    }

    //send response
    response.status(200).json({ aboutus_changed: true });
};