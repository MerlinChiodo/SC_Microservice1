import amqp from 'amqplib/callback_api.js'

export default class RabbitMQWrapper {

    static #connectionString = process.env.RABBITMQ_URL;

    static async publish(event) {
        console.log(`\x1b[36m[RabbitMQ]\x1b[0m attempting to sent event: ${event}`);
        amqp.connect(RabbitMQWrapper.#connectionString, { keepAlive: true }, (connectError, connection) => {
            if (connectError) { throw connectError; }
            connection.createChannel((channelError, channel) => {
                if (channelError) { throw channelError; }
                const routingKey = event.getRoutingKey();
                if (process.env.RABBIT_CHANGE === 'true') {
                    delete event.event_id; //changes the event when run in local enviroment
                }
                channel.publish('events', routingKey, Buffer.from(JSON.stringify(event)));
                console.log(`\x1b[36m[RabbitMQ]\x1b[0m sent event: ${event}`);
            });
            setTimeout(() => {
                connection.close();
            }, 500);
        });
    }

    static async startListener() {
        amqp.connect(RabbitMQWrapper.#connectionString, (connectError, connection) => {
            if (connectError) {
                console.error(`\x1b[36m[RabbitMQ]\x1b[0m Error while connecting to ${connectError}`);
                return setTimeout(RabbitMQWrapper.startListener, 1000);
            }
            connection.on('error', (error) => {
                console.error(`\x1b[36m[RabbitMQ]\x1b[0m Error ${error}`);
                return setTimeout(RabbitMQWrapper.startListener, 1000);
            });
            connection.on('close', () => {
                console.error(`\x1b[36m[RabbitMQ]\x1b[0m Connection closed`);
                return setTimeout(RabbitMQWrapper.startListener, 1000);
            });
            connection.createChannel((channelError, channel) => {
                if (channelError) { return 0; }
                console.log('\x1b[36m[RabbitMQ]\x1b[0m Listening for events')

                channel.consume('buergerbuero', async (msg) => {
                    //consume incoming event
                    RabbitMQWrapper.handleEvent(msg.content.toString());
                }, {
                    noAck: true,
                })
            })
        })
    }

    static async handleEvent(message) {
        try {
            console.log(`\x1b[36m[RabbitMQ]\x1b[0m recieved event: ${message}`);
            let event = JSON.parse(message);
            //check if event is valid
            if (false) {
                //event is valid
            } else {
                //event is invalid
                console.error('\x1b[36m[RabbitMQ]\x1b[0m Error while validating event');
            }
        } catch (error) {
            console.error(`\x1b[36m[RabbitMQ]\x1b[0m Error while parsing event: ${error}`);
        }
    }

}

