import RabbitMQEvent from "./RabbitMQEvent.js";

export default class CitizenDeathEvent extends RabbitMQEvent {

    constructor(citizen_id, time_of_death = new Date()) {
        super('Todesmeldung', 1006, 'public.buergerbuero');
        if (typeof citizen_id !== 'number' || citizen_id < 1) {
            throw new Error('Citizen id must be a positive integer!');
        }
        this.citizen_id = citizen_id;
        //date format is: DD.MM.YYYYTHH:mm
        this.time_of_death = `${time_of_death.getDate()}.${time_of_death.getMonth() + 1}.${time_of_death.getFullYear()}T${time_of_death.getHours()}:${time_of_death.getMinutes()}`;
    }

}
