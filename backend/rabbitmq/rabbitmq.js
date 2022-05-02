import amqp from 'amqplib/callback_api.js'

export default class RabbitMQWrapper {

    static #rabbitUsername = process.env.RABBIT_USERNAME
    static #rabbitPassword = process.env.RABBIT_PASSWORD
    static #rabbitServerUrl = process.env.RABBIT_SERVER_URL
    static #connectionString = `amqp://${RabbitMQWrapper.#rabbitUsername}:${RabbitMQWrapper.#rabbitPassword}@${RabbitMQWrapper.#rabbitServerUrl}:5672`;

    static async publish(event) {
        console.log(`RabbitMQ: attempting to sent event ${event}`);
        amqp.connect(RabbitMQWrapper.#connectionString, { keepAlive: true }, (connectError, connection) => {
            if (connectError) { throw connectError; }
            connection.createChannel((channelError, channel) => {
                if (channelError) { throw channelError; }
                const routingKey = event.getRoutingKey();
                //channel.assertExchange('events', 'topic', { durable: false });
                if(process.env.RABBIT_CHANGE === 'true') {
                    event.event_id = 9999;
                }
                channel.publish('events', routingKey, Buffer.from(JSON.stringify(event)));
                console.log(`RabbitMQ: sent event ${event}`);
            });
        });
    }

}

