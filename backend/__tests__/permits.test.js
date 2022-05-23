import request from 'supertest';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import { jest } from '@jest/globals'
import citizenRouter from '../citizen/citizen.router.js';
import permitRouter from '../permits/permits.router.js';
import express from 'express';
import SmartAuth from '../util/smartauth.js';

//setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create database mock, no actuall calls to database when testing
const createPermit = jest.fn();
const getPermitById = jest.fn();
const updatePermit = jest.fn();
const deletePermit = jest.fn();
const getAllPermits = jest.fn();
const createPermitRequest = jest.fn();
const getAllOpenPermitRequests = jest.fn();
const approvePermitRequest = jest.fn();
const rejectPermitRequest = jest.fn();
//setup routes
app.use((req, res, next) => {
    req.permitModel = { createPermit, getPermitById, updatePermit, deletePermit, getAllPermits, createPermitRequest, getAllOpenPermitRequests, approvePermitRequest, rejectPermitRequest };
    next();
});
app.use("/api/citizen", citizenRouter);
app.use("/api/permits", permitRouter);

describe('Permits API', () => {

    beforeAll(() => {
        //mock console.error so that jest will not fail for logged errors
        jest.spyOn(console, 'error').mockImplementation(() => { });
        //mock rabbitmq that the events are not sent while testing
        jest.spyOn(RabbitMQWrapper, 'publish').mockImplementation(() => { });
        //mock smartauth while testing, to not call the microservice
        jest.spyOn(SmartAuth, 'getPermissions').mockImplementation(() => { return true; });
    });

    beforeEach(() => {
        createPermit.mockReset();
        getPermitById.mockReset();
        updatePermit.mockReset();
        deletePermit.mockReset();
        getAllPermits.mockReset();
        createPermitRequest.mockReset();
        getAllOpenPermitRequests.mockReset();
        approvePermitRequest.mockReset();
        rejectPermitRequest.mockReset();
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

    describe('POST /api/permits', () => {

        test('/api/permits [correct input]', async () => {
            const data = { permit_id: 1, title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" };
            createPermit.mockReturnValue(data);
            const response = await request(app).post('/api/permits').send(data);
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.permit).toEqual(data);
            //database is called correctly
            expect(createPermit.mock.calls.length).toBe(1);
        });

        test('/api/permits [wrong input]', async () => {
            const data = {};
            createPermit.mockReturnValue(null);
            const response = await request(app).post('/api/permits').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(createPermit.mock.calls.length).toBe(0);
        });

        test('/api/permits [database error]', async () => {
            const data = { permit_id: 1, title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" };
            createPermit.mockRejectedValue(new Error('database error'));
            const response = await request(app).post('/api/permits').send(data);
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(createPermit.mock.calls.length).toBe(1);
        });

    });

    describe('GET /api/permits/:id', () => {

        test('/api/permits/:id [correct input]', async () => {
            const data = { permit_id: 1, title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" };
            getPermitById.mockReturnValue(data);
            const response = await request(app).get('/api/permits/1');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.permit).toEqual(data);
            //database is called correctly
            expect(getPermitById.mock.calls.length).toBe(1);
        });

        test('/api/permits/:id [wrong input]', async () => {
            getPermitById.mockReturnValue(null);
            const response = await request(app).get('/api/permits/0');
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(getPermitById.mock.calls.length).toBe(0);
        });

        test('/api/permits/:id [database error]', async () => {
            getPermitById.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/permits/1');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(getPermitById.mock.calls.length).toBe(1);
        });

    });

    describe('GET /api/permits/all', () => {

        test('/api/permits/all [correct response]', async () => {
            const data = [
                { permit_id: 1, title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" },
                { permit_id: 2, title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" }
            ];
            getAllPermits.mockReturnValue(data);
            const response = await request(app).get('/api/permits/');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.permits).toEqual(data);
            //database is called correctly
            expect(getAllPermits.mock.calls.length).toBe(1);
        });

        test('/api/permits/all [database error]', async () => {
            getAllPermits.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/permits/');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(getAllPermits.mock.calls.length).toBe(1);
        });

    });

    describe('PUT /api/permits/:id', () => {

        test('/api/permits/:id [correct input]', async () => {
            const data = { title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" };
            updatePermit.mockReturnValue(data);
            const response = await request(app).put('/api/permits/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.permit).toEqual(data);
            //database is called correctly
            expect(updatePermit.mock.calls.length).toBe(1);
        });

        test('/api/permits/:id [wrong input]', async () => {
            const data = {};
            updatePermit.mockReturnValue(null);
            const response = await request(app).put('/api/permits/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(updatePermit.mock.calls.length).toBe(0);
        });

        test('/api/permits/:id [wrong id]', async () => {
            const data = { title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" };
            updatePermit.mockReturnValue(null);
            const response = await request(app).put('/api/permits/0').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(updatePermit.mock.calls.length).toBe(0);
        });

        test('/api/permits/:id [database error]', async () => {
            const data = { title: "Dies ist ein Titel", description: "Dies ist eine Beschreibung" };
            updatePermit.mockRejectedValue(new Error('database error'));
            const response = await request(app).put('/api/permits/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(updatePermit.mock.calls.length).toBe(1);
        });

    });

    describe('DELETE /api/permits/:id', () => {

        test('/api/permits/:id [correct input]', async () => {
            deletePermit.mockReturnValue(true);
            const response = await request(app).delete('/api/permits/1');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.deleted).toBe(true);
            //database is called correctly
            expect(deletePermit.mock.calls.length).toBe(1);
        });

        test('/api/permits/:id [wrong input]', async () => {
            deletePermit.mockReturnValue(false);
            const response = await request(app).delete('/api/permits/0');
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(deletePermit.mock.calls.length).toBe(0);
        });

        test('/api/permits/:id [database error]', async () => {
            deletePermit.mockRejectedValue(new Error('database error'));
            const response = await request(app).delete('/api/permits/1');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(deletePermit.mock.calls.length).toBe(1);
        });

    });

    describe('POST /api/permits/requestPermit', () => {

        test('/api/permits/requestPermit [correct input]', async () => {
            const data = { permit_id: 1, citizen_id: 1 };
            createPermitRequest.mockReturnValue(true);
            const response = await request(app).post('/api/permits/requestPermit').send(data);
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ success: true });
            //database is called correctly
            expect(createPermitRequest.mock.calls.length).toBe(1);
        });

        test('/api/permits/requestPermit [wrong input]', async () => {
            const data = { permit_id: 1 }; //missing citizen_id
            createPermitRequest.mockReturnValue(false);
            const response = await request(app).post('/api/permits/requestPermit').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(createPermitRequest.mock.calls.length).toBe(0);
        });

        test('/api/permits/requestPermit [database error]', async () => {
            const data = { permit_id: 1, citizen_id: 1 };
            createPermitRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).post('/api/permits/requestPermit').send(data);
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(createPermitRequest.mock.calls.length).toBe(1);
        });

    });

    describe('GET /api/permits/open', () => {

        test('/api/permits/open [correct response]', async () => {
            const data = [
                { citizen_id: 1, permit_id: 1, status: 'offen' },
                { citizen_id: 2, permit_id: 2, status: 'offen' },
            ];
            getAllOpenPermitRequests.mockReturnValue(data);
            const response = await request(app).get('/api/permits/open');
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.requests).toEqual(data);
            //database is called correctly
            expect(getAllOpenPermitRequests.mock.calls.length).toBe(1);
        });

        test('/api/permits/open [database error]', async () => {
            getAllOpenPermitRequests.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/permits/open');
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(getAllOpenPermitRequests.mock.calls.length).toBe(1);
        });

    });

    describe('PUT /api/permits/approve/:id', () => {

        test('/api/permits/approve/:id [correct input]', async () => {
            const data = { valid_until: '2020-01-01' };
            approvePermitRequest.mockReturnValue(true);
            const response = await request(app).post('/api/permits/approve/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ success: true });
            //database is called correctly
            expect(approvePermitRequest.mock.calls.length).toBe(1);
        });

        test('/api/permits/approve/:id [wrong input]', async () => {
            const data = { valid_until: '2020-01' };
            const response = await request(app).post('/api/permits/approve/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(approvePermitRequest.mock.calls.length).toBe(0);
        });

        test('/api/permits/approve/:id [wrong id]', async () => {
            const data = { valid_until: '2020-01-01' };
            const response = await request(app).post('/api/permits/approve/0').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(approvePermitRequest.mock.calls.length).toBe(0);
        });

        test('/api/permits/approve/:id [database error]', async () => {
            const data = { valid_until: '2020-01-01' };
            approvePermitRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).post('/api/permits/approve/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(approvePermitRequest.mock.calls.length).toBe(1);
        });

    });

    describe('PUT /api/permits/reject/:id', () => {

        test('/api/permits/reject/:id [correct input]', async () => {
            const data = { reason: 'test' };
            rejectPermitRequest.mockReturnValue(true);
            const response = await request(app).post('/api/permits/reject/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ success: true });
            //database is called correctly
            expect(rejectPermitRequest.mock.calls.length).toBe(1);
        });

        test('/api/permits/reject/:id [wrong id]', async () => {
            const data = { reason: 'test' };
            const response = await request(app).post('/api/permits/reject/0').send(data);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(rejectPermitRequest.mock.calls.length).toBe(0);
        });

        test('/api/permits/reject/:id [database error]', async () => {
            const data = { reason: 'test' };
            rejectPermitRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).post('/api/permits/reject/1').send(data);
            //response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //database is called correctly
            expect(rejectPermitRequest.mock.calls.length).toBe(1);
        });

    });

});
