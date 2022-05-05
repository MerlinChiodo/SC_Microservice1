import amqp from 'amqplib/callback_api.js'

export default class RabbitMQWrapper {

    static #connectionString = process.env.RABBITMQ_URL;

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

