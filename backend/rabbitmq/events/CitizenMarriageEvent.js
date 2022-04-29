import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenMarriageEvent extends RabbitMQEvent {

    constructor(citizen_id_1, citizen_id_2) {
        super('Eheschließung', 1004, 'public.buergerbuero.citizen.marriage');
        if (typeof citizen_id_1 !== 'string' || citizen_id_1.length === 0) {
            throw new Error('Citizen id 1 must be a non-empty string!');
        }
        if (typeof citizen_id_2 !== 'string' || citizen_id_2.length === 0) {
            throw new Error('Citizen id 2 must be a non-empty string!');
        }
        this.partners = {
            citizen_id_1: citizen_id_1,
            citizen_id_2: citizen_id_2
        };
    }

}
