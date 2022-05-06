import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenAddressChangeEvent extends RabbitMQEvent {

    constructor(citizen_id) {
        super('Adressänderung', 1003, 'public.buergerbuero.citizen.addresschange');
        if (typeof citizen_id !== 'number' || citizen_id < 1) {
            throw new Error('Citizen id must be a positive integer!');
        }
        this.citizen_id = citizen_id;
    }

}
