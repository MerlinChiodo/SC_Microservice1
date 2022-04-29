import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenNameChangeEvent extends RabbitMQEvent {

    constructor(citizen_id) {
        super('Namensänderung', 1002, 'public.buergerbuero.citizen.namechange');
        if (typeof citizen_id !== 'string' || citizen_id.length === 0) {
            throw new Error('Citizen id must be a non-empty string!');
        }
        this.citizen_id = citizen_id;
    }

}
