import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenCreatedEvent extends RabbitMQEvent {

    constructor(citizen_id) {
        super('Neuer Bürger gemeldet', 1001, 'public.buergerbuero');
        if (typeof citizen_id !== 'number' || citizen_id < 1) {
            throw new Error('Citizen id must be a positive integer!');
        }
        this.citizen_id = citizen_id;
    }

}
