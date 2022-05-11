import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenMarriageEvent extends RabbitMQEvent {

    constructor(citizen_id_1, citizen_id_2) {
        super('Eheschließung', 1004, 'public.buergerbuero');
        if (typeof citizen_id_1 !== 'number' || citizen_id_1 < 1) {
            throw new Error('Citizen id must be a positive integer!');
        }
        if (typeof citizen_id_2 !== 'number' || citizen_id_2 < 1) {
            throw new Error('Citizen id must be a positive integer!');
        }
        this.partners = {
            citizen_id_1: citizen_id_1,
            citizen_id_2: citizen_id_2
        };
    }

}
