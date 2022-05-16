
export default class RabbitMQEvent {

    static #minimumEventID = 1000;
    #routingKey;

    constructor(name, id, routingKey) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Eventname must be a non-empty string!');
        }
        if (typeof id !== 'number' || id < RabbitMQEvent.#minimumEventID) {
            throw new Error(`Event id must be a number >= ${RabbitMQEvent.#minimumEventID}!`);
        }
        if (typeof routingKey !== 'string' || routingKey.length === 0) {
            throw new Error('Routingkey must be a non-empty string!');
        }
        this.event_id = id;
        this.service_name = 'buergerbuero';
        this.event_name = name;
        this.#routingKey = routingKey;
        //date format is: DD.MM.YYYYTHH:mm
        this.date = new Date().toISOString();
    }

    getRoutingKey() {
        return this.#routingKey;
    }

}

RabbitMQEvent.prototype.toString = function () {
    return JSON.stringify(this);
}
