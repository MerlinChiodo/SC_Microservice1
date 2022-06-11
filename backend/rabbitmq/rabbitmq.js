import amqp from 'amqplib/callback_api.js';
import { validate } from 'jsonschema';
import { BasicEvent } from './events.jsonschema.js';
import * as EventHandler from './eventhandler.js';

export default class RabbitMQWrapper {

    static #connectionString = process.env.RABBITMQ_URL;

    static async publish(event) {
        this.log(` attempting to sent event: ${event}`);
        amqp.connect(RabbitMQWrapper.#connectionString, { keepAlive: true }, (connectError, connection) => {
            if (connectError) { throw connectError; }
            connection.createChannel((channelError, channel) => {
                if (channelError) { throw channelError; }
                const routingKey = event.getRoutingKey();
                if (process.env.RABBIT_CHANGE === 'true') {
                    delete event.event_id; //changes the event when run in local enviroment
                }
                channel.publish('events', routingKey, Buffer.from(JSON.stringify(event)));
                this.log(` sent event: ${event}`);
            });
            setTimeout(() => {
                connection.close();
            }, 500);
        });
    }

    static async startListener() {
        amqp.connect(RabbitMQWrapper.#connectionString, (connectError, connection) => {
            if (connectError) {
                this.error(`Error while connecting: ${connectError}`);
                return setTimeout(RabbitMQWrapper.startListener, 1000);
            }
            connection.on('error', (error) => {
                this.error(`Error: ${error}`);
                return setTimeout(RabbitMQWrapper.startListener, 1000);
            });
            connection.on('close', () => {
                this.error(`Connection closed`);
                return setTimeout(RabbitMQWrapper.startListener, 1000);
            });
            connection.createChannel((channelError, channel) => {
                if (channelError) { return 0; }
                this.log('Listening for events');

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
            this.log(` recieved event: ${message.replace(/(?:\r\n|\r|\n|\s+)/g, ' ')}`);
            const event = JSON.parse(message);

            //validate event
            const validationResult = validate(event, BasicEvent);
            if (validationResult.errors.length > 0) {
                this.error(`Error while validating event \x1b[31;2m${event.event_name}\x1b[0m: ${validationResult.errors}`);
                return;
            }

            //event is valid
            this.log(`received event: \x1b[33;2m${event.event_name}\x1b[0m with id \x1b[33;2m${event.event_id}`);
            switch (event.event_id) {
                case 9000:
                    EventHandler.handleRefugeeEvent(event);
                    break;

                case 9001:
                    EventHandler.handleRefugeeFamilyEvent(event);
                    break;

                default:
                    this.log(`received unknown event \x1b[31;2m${event.event_name}\x1b[0m with id \x1b[31;2m${event.event_id}`);
                    break;
            }
        } catch (error) {
            this.error(`Error while handling event: ${error}`);
        }
    }

    static log(message) {
        console.log(`\x1b[36m[RabbitMQ]\x1b[0m ${message}\x1b[0m`);
    }

    static error(message) {
        console.error(`\x1b[36m[RabbitMQ]\x1b[0m ${message}\x1b[0m`);
    }

}

