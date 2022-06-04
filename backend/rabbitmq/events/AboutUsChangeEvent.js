import RabbitMQEvent from "./RabbitMQEvent.js";

export default class AboutUsChangeEvent extends RabbitMQEvent {

    constructor(service_url, text, picture_url) {
        super('Updated About US', 1000, 'public.buergerbuero');
        if (typeof service_url !== 'string' || service_url.length === 0) {
            throw new Error('Service URL must be a non-empty string!');
        }
        this.url = service_url;
        this.about_us = text || '';
        this.picture = picture_url || '';
        this.service_name = 'Bürgerbüro';
    }

}
