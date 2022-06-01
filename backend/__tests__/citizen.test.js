import request from 'supertest';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import { jest } from '@jest/globals'
import citizenRouter from '../citizen/citizen.router.js';
import express from 'express';
import SmartAuth from '../util/smartauth.js';

//setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create database mock, no actuall calls to database when testing
const createCitizen = jest.fn();
const getCitizenById = jest.fn();
const getChildrenIds = jest.fn();
const hasDogPermit = jest.fn();
const getSpouseId = jest.fn();
const getPermits = jest.fn();
//setup routes
app.use((req, res, next) => {
    req.citizenModel = { createCitizen, getCitizenById, getChildrenIds, hasDogPermit, getSpouseId, getPermits };
    next();
});
app.use("/api/citizen", citizenRouter);


describe('Citizen API', () => {

    beforeAll(() => {
        //mock console.error so that jest will not fail for logged errors
        jest.spyOn(console, 'error').mockImplementation(() => { });
        //mock rabbitmq that the events are not sent while testing
        jest.spyOn(RabbitMQWrapper, 'publish').mockImplementation(() => { });
        //mock smartauth while testing, to not call the microservice
        jest.spyOn(SmartAuth, 'getPermissions').mockImplementation(() => { return true; });
    });

    beforeEach(() => {
        createCitizen.mockClear();
        getCitizenById.mockClear();
        getChildrenIds.mockClear();
        hasDogPermit.mockClear();
        getSpouseId.mockClear();
        getPermits.mockClear();
    });

    afterEach(() => {
        console.error.mockClear();
        RabbitMQWrapper.publish.mockClear();
        SmartAuth.getPermissions.mockClear();
    });

    afterAll(() => {
        console.error.mockRestore();
        RabbitMQWrapper.publish.mockRestore();
        SmartAuth.getPermissions.mockRestore();
    });

    describe('GET /api/citizen/:id', () => {

        test('/api/citizen/0 [wrong id as parameter]', async () => {
            const response = await request(app).get('/api/citizen/0');
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //no citizen was searched in the database
            expect(getCitizenById.mock.calls.length).toBe(0);
        });

        test('/api/citizen/1 [citizen not found in database]', async () => {
            getCitizenById.mockResolvedValue(null);
            const response = await request(app).get('/api/citizen/1');
            //response is correct
            expect(response.statusCode).toBe(404);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //no citizen was searched in the database
            expect(getCitizenById.mock.calls.length).toBe(1);
        });

        test('/api/citizen/2 [check correct response]', async () => {
            const data = { citizen_id: 2, firstname: 'John', lastname: 'Doe', gender: 'm', birthdate: '2000-01-01', birthname: null, place_of_birth: null, email: 'john@doe.de', street: 'Musterweg', housenumber: '32v', city: 'Musterhausen', city_code: 12345 };
            getCitizenById.mockResolvedValue(data);
            getChildrenIds.mockResolvedValue([]);
            getSpouseId.mockResolvedValue(null);
            const response = await request(app).get('/api/citizen/2');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.citizen_id).toBe(2);
            expect(response.body.firstname).toEqual(data.firstname);
            expect(response.body.lastname).toEqual(data.lastname);
            expect(response.body.gender).toEqual(data.gender);
            expect(response.body.birthdate).toEqual(data.birthdate);
            expect(response.body.birthname).toBeNull();
            expect(response.body.place_of_birth).toBeNull();
            expect(response.body.email).toEqual(data.email);
            expect(response.body.address.street).toEqual(data.street);
            expect(response.body.address.housenumber).toEqual(data.housenumber);
            expect(response.body.address.city).toEqual(data.city);
            expect(response.body.address.city_code).toEqual(data.city_code);
            expect(response.body.child_ids).toEqual([]);
            expect(response.body.spouse_id).toBeNull();
            //all functions are being called
            expect(getCitizenById.mock.calls.length).toBe(1);
            expect(getChildrenIds.mock.calls.length).toBe(1);
            expect(getSpouseId.mock.calls.length).toBe(1);
        });

        test('/api/citizen/3 [database error]', async () => {
            getCitizenById.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/citizen/3');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //all functions are being called
            expect(getCitizenById.mock.calls.length).toBe(1);
        });

    });

    describe('POST /api/citizen', () => {

        test('/api/citizen [correct input]', async () => {
            const data = { firstname: 'John', lastname: 'Doe', birthdate: '2000-01-01T00:00:00.000Z', gender: 'm', street: 'Musterweg', housenumber: '34b', city_code: 12345, city: 'Musterhausen' };
            createCitizen.mockResolvedValue(1);
            const response = await request(app).post('/api/citizen').send(data);
            //response is correct
            expect(response.statusCode).toBe(201);
            expect(response.body.citizen_id).toEqual(1);
            expect(response.body.citizen_created).toBeTruthy();
            //all functions are being called
            expect(createCitizen.mock.calls.length).toBe(1);
        });

        test('/api/citizen [wrong input]', async () => {
            const data = { firstname: 'John', lastname: 'Doe', birthdate: '2000-01-01T00:00:00.000Z' };
            createCitizen.mockResolvedValue(1);
            const response = await request(app).post('/api/citizen').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //function should not be called
            expect(createCitizen.mock.calls.length).toBe(0);
        });

        test('/api/citizen [database error]', async () => {
            createCitizen.mockRejectedValue(new Error('database error'));
            const data = { firstname: 'John', lastname: 'Doe', birthdate: '2000-01-01T00:00:00.000Z', gender: 'm', street: 'Musterweg', housenumber: '34b', city_code: 12345, city: 'Musterhausen' };
            const response = await request(app).post('/api/citizen').send(data);
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //function should be called
            expect(createCitizen.mock.calls.length).toBe(1);
        });

    });

    describe('GET /api/citizen/:id/children', () => {

        test('/api/citizen/0/children [wrong id as parameter]', async () => {
            const response = await request(app).get('/api/citizen/0/children');
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //no citizen was searched in the database
            expect(getChildrenIds.mock.calls.length).toBe(0);
        });

        test('/api/citizen/1/children [check correct response]', async () => {
            const data = [1, 2, 3];
            getChildrenIds.mockResolvedValue(data);
            const response = await request(app).get('/api/citizen/1/children');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.citizen_id).toEqual(1);
            expect(response.body.children).toEqual(data);
            //all functions are being called
            expect(getChildrenIds.mock.calls.length).toBe(1);
        });

        test('/api/citizen/2/children [database error]', async () => {
            getChildrenIds.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/citizen/2/children');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //all functions are being called
            expect(getChildrenIds.mock.calls.length).toBe(1);
        });

    });

    describe('GET /api/citizen/:id/hasDogPermit', () => {

        test('/api/citizen/0/children [wrong id as parameter]', async () => {
            const response = await request(app).get('/api/citizen/0/hasDogPermit');
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //no citizen was searched in the database
            expect(hasDogPermit.mock.calls.length).toBe(0);
        });

        test('/api/citizen/1/children [check correct response]', async () => {
            const data = true;
            hasDogPermit.mockResolvedValue(data);
            const response = await request(app).get('/api/citizen/1/hasDogPermit');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.citizen_id).toEqual(1);
            expect(response.body.hasDogPermit).toEqual(data);
            //all functions are being called
            expect(hasDogPermit.mock.calls.length).toBe(1);
        });

        test('/api/citizen/2/children [database error]', async () => {
            hasDogPermit.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/citizen/2/hasDogPermit');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //all functions are being called
            expect(hasDogPermit.mock.calls.length).toBe(1);
        });

    });

    describe('GET /api/citizen/:id/permits', () => {

        test('/api/citizen/0/permits [wrong id as parameter]', async () => {
            const response = await request(app).get('/api/citizen/0/permits');
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //no citizen was searched in the database
            expect(getPermits.mock.calls.length).toBe(0);
        });

        test('/api/citizen/1/permits [check correct response]', async () => {
            const data = [1, 2, 3];
            getPermits.mockResolvedValue(data);
            const response = await request(app).get('/api/citizen/1/permits');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.citizen_id).toEqual(1);
            expect(response.body.permits).toEqual(data);
            //all functions are being called
            expect(getPermits.mock.calls.length).toBe(1);
        });

        test('/api/citizen/2/permits [database error]', async () => {
            getPermits.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/citizen/2/permits');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //all functions are being called
            expect(getPermits.mock.calls.length).toBe(1);
        });

    });

});