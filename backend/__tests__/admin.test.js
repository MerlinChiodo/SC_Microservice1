import request from 'supertest';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import { jest } from '@jest/globals'
import adminRouter from '../admin/admin.router.js';
import express from 'express';

//setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', adminRouter);

describe('Admin API', () => {

    beforeAll(() => {
        //mock console.error so that jest will not fail for logged errors
        jest.spyOn(console, 'error').mockImplementation(() => { });
        //mock rabbitmq that the events are not sent while testing
        jest.spyOn(RabbitMQWrapper, 'publish').mockImplementation(() => { });
    });

    beforeEach(() => { });

    afterEach(() => {
        console.error.mockClear();
        RabbitMQWrapper.publish.mockClear();
    });

    afterAll(() => {
        console.error.mockRestore();
        RabbitMQWrapper.publish.mockRestore();
    });

    describe('POST /api/admin/aboutus', () => {

        test('/api/admin/aboutus [wrong body]', async () => {
            const data = { link: '', aboutus: '', image: '' };
            const response = await request(app).post('/api/admin/aboutus').send(data);
            //check response
            expect(response.statusCode).toBe(400);
            expect(response.body.aboutus_changed).toBeFalsy();
        });

        test('/api/admin/aboutus [correct body]', async () => {
            const data = { link: 'http://vps2290194.fastwebserver.de:9710/', aboutus: 'Dies ist das Bürgerbüro', image: 'https://raw.githubusercontent.com/SmartCityProjectGroup/SmartCity/main/Logo_4.png' };
            const response = await request(app).post('/api/admin/aboutus').send(data);
            //check response
            expect(response.statusCode).toBe(200);
            expect(response.body.aboutus_changed).toBeTruthy();
        });

    });

});