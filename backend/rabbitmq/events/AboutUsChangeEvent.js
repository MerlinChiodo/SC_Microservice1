import RabbitMQEvent from "./RabbitMQEvent.js";

export default class AboutUsChangeEvent extends RabbitMQEvent {

    constructor(text, picture_url) {
        super('About Us', 1000, 'public.buergerbuero');
        if (typeof text !== 'string' || text.length === 0) {
            throw new Error('Text must be a non-empty string!');
        }
        if (typeof picture_url !== 'string' || picture_url.length === 0) {
            throw new Error('Picture url must be a non-empty string!');
        }
        this.text = text;
        this.picture_url = picture_url;
    }

}
