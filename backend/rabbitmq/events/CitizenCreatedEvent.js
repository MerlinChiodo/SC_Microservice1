import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenCreatedEvent extends RabbitMQEvent {

    constructor(citizen_id) {
        super('Neuer Bürger', 1001, 'public.buergerbuero.citizen.created');
        if (typeof citizen_id !== 'string' || citizen_id.length === 0) {
            throw new Error('Citizen id must be a non-empty string!');
        }
        this.citizen_id = citizen_id;
    }

}
