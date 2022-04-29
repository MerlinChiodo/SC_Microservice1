import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenAddressChangeEvent extends RabbitMQEvent {

    constructor(citizen_id) {
        super('Adressänderung', 1003, 'public.buergerbuero.citizen.addresschange');
        if (typeof citizen_id !== 'string' || citizen_id.length === 0) {
            throw new Error('Citizen id must be a non-empty string!');
        }
        this.citizen_id = citizen_id;
    }

}
