import amqp from 'amqplib'

export async function send(event) {
    const rabbitUsername = process.env.RABBIT_USERNAME
    const rabbitPassword = process.env.RABBIT_PASSWORD
    const rabbitServerUrl = process.env.RABBIT_SERVER_URL
    return new Promise((resolve, reject) => {
        amqp.connect(`amqp://${rabbitUsername}:${rabbitPassword}@${rabbitServerUrl}:5672`, async (connectError, connection) => {
            if (connectError) {
                console.error(connectError);
                reject(connectError);
            }
            connection.createChannel(async (channelError, channel) => {
                if (channelError) {
                    console.error(channelError);
                    reject(channelError);
                }
                //TODO send event via rabbitmq
                const routingKey = event.getRoutingKey();
                console.log(`RabbitMQ: sent event ${event}`);
                resolve();
            });
        });
    });
}
