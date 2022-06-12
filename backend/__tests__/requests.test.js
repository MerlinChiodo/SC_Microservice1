import request from 'supertest';
import RabbitMQWrapper from '../rabbitmq/rabbitmq.js';
import MySQLWrapper from '../util/mysql.js';
import { jest } from '@jest/globals'
import requestsRouter from '../requests/requests.router.js';
import express from 'express';
import SmartAuth from '../util/smartauth.js';

//setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create database mock, no actuall calls to database when testing
const createRequest = jest.fn();
const getAllOpenRequests = jest.fn();
const approveRequest = jest.fn();
const rejectRequest = jest.fn();
const getRequestById = jest.fn();
const deleteRequest = jest.fn();
//setup routes
app.use((req, res, next) => {
    req.requestModel = { createRequest, getAllOpenRequests, approveRequest, rejectRequest, getRequestById, deleteRequest };
    next();
});
app.use("/api/requests", requestsRouter);

describe('Request API', () => {

    beforeAll(() => {
        //mock console.error so that jest will not fail for logged errors
        jest.spyOn(console, 'error').mockImplementation(() => { });
        //mock rabbitmq that the events are not sent while testing
        jest.spyOn(RabbitMQWrapper, 'publish').mockImplementation(() => { });
        //mock smartauth while testing, to not call the microservice
        jest.spyOn(SmartAuth, 'getPermissions').mockImplementation(() => { return true; });
        //mock mysql connection pool creation
        jest.spyOn(MySQLWrapper, 'createOrGetPool').mockImplementation(() => { });
    });

    beforeEach(() => {
        createRequest.mockReset();
        getAllOpenRequests.mockReset();
        approveRequest.mockReset();
        rejectRequest.mockReset();
        getRequestById.mockReset();
        deleteRequest.mockReset();
    });

    afterEach(() => {
        console.error.mockClear();
        RabbitMQWrapper.publish.mockClear();
        SmartAuth.getPermissions.mockClear();
        MySQLWrapper.createOrGetPool.mockClear();
    });

    afterAll(() => {
        console.error.mockRestore();
        RabbitMQWrapper.publish.mockRestore();
        SmartAuth.getPermissions.mockRestore();
        MySQLWrapper.createOrGetPool.mockRestore();
    });

    describe('POST /api/requests', () => {

        test('/api/requests [correct input]', async () => {
            //setup
            const requestBody = { citizen_id: 1, reason: "test", firstname: "test", lastname: "test", street: "test", house_number: "test", city_code: 1, city: "test" };
            const dbResult = { request_id: 1, citizen_id: 1, reasoning: 'Darum', citizen_id_new: 1, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' };
            createRequest.mockReturnValue(dbResult);
            const response = await request(app).post('/api/requests').send(requestBody);
            //check if response is correct
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ request: dbResult });
            //check if database was called
            expect(createRequest).toHaveBeenCalledTimes(1);
        });

        test('/api/requests [wrong input]', async () => {
            //setup
            const requestBody = { citizen_id: 1, firstname: "test", lastname: "test", street: "test", house_number: "test", city_code: 1, city: "test" };
            createRequest.mockReturnValue(false);
            const response = await request(app).post('/api/requests').send(requestBody);
            //check if response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was not called
            expect(createRequest).toHaveBeenCalledTimes(0);
        });

        test('/api/requests [database error]', async () => {
            //setup
            const requestBody = { citizen_id: 1, reason: "test", firstname: "test", lastname: "test", street: "test", house_number: "test", city_code: 1, city: "test" };
            createRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).post('/api/requests').send(requestBody);
            //check if response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was not called
            expect(createRequest).toHaveBeenCalledTimes(1);
        });

    });

    describe('GET /api/requests', () => {

        test('/api/requests [correct response]', async () => {
            //setup
            const dbResult = [{ request_id: 1, citizen_id: 1, reasoning: 'Darum', citizen_id_new: 1, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' }];
            getAllOpenRequests.mockReturnValue(dbResult);
            const response = await request(app).get('/api/requests');
            //check if response is correct
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ requests: dbResult });
            //check if database was called
            expect(getAllOpenRequests).toHaveBeenCalledTimes(1);
        });

        test('/api/requests [database error]', async () => {
            //setup
            getAllOpenRequests.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/requests');
            //check if response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(getAllOpenRequests).toHaveBeenCalledTimes(1);
        });

    });

    describe('POST /api/requests/approve/:id', () => {

        test('/api/requests/approve/:id [correct input]', async () => {
            //setup
            approveRequest.mockReturnValue(true);
            const response = await request(app).post(`/api/requests/approve/1`);
            //check if response is correct
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true });
            //check if database was called
            expect(approveRequest).toHaveBeenCalledTimes(1);
        });

        test('/api/requests/approve/:id [wrong input]', async () => {
            //setup
            approveRequest.mockReturnValue(true);
            const response = await request(app).post(`/api/requests/approve/0`);
            //check if response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(approveRequest).toHaveBeenCalledTimes(0);
        });

        test('/api/requests/approve/:id [database error]', async () => {
            //setup
            approveRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).post(`/api/requests/approve/1`);
            //check if response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(approveRequest).toHaveBeenCalledTimes(1);
        });

    });

    describe('POST /api/requests/reject/:id', () => {

        test('/api/requests/reject/:id [correct input]', async () => {
            //setup
            rejectRequest.mockReturnValue(true);
            const response = await request(app).post(`/api/requests/reject/1`);
            //check if response is correct
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true });
            //check if database was called
            expect(rejectRequest).toHaveBeenCalledTimes(1);
        });

        test('/api/requests/reject/:id [wrong input]', async () => {
            //setup
            rejectRequest.mockReturnValue(true);
            const response = await request(app).post(`/api/requests/reject/0`);
            //check if response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(rejectRequest).toHaveBeenCalledTimes(0);
        });

        test('/api/requests/reject/:id [database error]', async () => {
            //setup
            rejectRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).post(`/api/requests/reject/1`);
            //check if response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(rejectRequest).toHaveBeenCalledTimes(1);
        });

    });

    describe('GET /api/requests/:id', () => {

        test('/api/requests/:id [correct input]', async () => {
            //setup
            const dbResult = [{ request_id: 1, citizen_id: 1, reasoning: 'Darum', citizen_id_new: 1, opened: '2018-01-01T00:00:00.000Z', closed: null, status: 'offen' }];
            getRequestById.mockReturnValue(dbResult);
            const response = await request(app).get('/api/requests/1');
            //check if response is correct
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ request: dbResult });
            //check if database was called
            expect(getRequestById).toHaveBeenCalledTimes(1);
        });

        test('/api/requests/:id [wrong input]', async () => {
            //setup
            const response = await request(app).get('/api/requests/0');
            //check if response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(getRequestById).toHaveBeenCalledTimes(0);
        });

        test('/api/requests/:id [database error]', async () => {
            //setup
            getRequestById.mockRejectedValue(new Error('database error'));
            const response = await request(app).get('/api/requests/1');
            //check if response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(getRequestById).toHaveBeenCalledTimes(1);
        });

    });

    describe('DELETE /api/requests/:id', () => {

        test('/api/requests/:id [correct input]', async () => {
            //setup
            deleteRequest.mockReturnValue(true);
            const response = await request(app).delete('/api/requests/1');
            //check if response is correct
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true });
            //check if database was called
            expect(deleteRequest).toHaveBeenCalledTimes(1);
        });

        test('/api/requests/:id [wrong input]', async () => {
            //setup
            deleteRequest.mockReturnValue(true);
            const response = await request(app).delete('/api/requests/0');
            //check if response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(deleteRequest).toHaveBeenCalledTimes(0);
        });

        test('/api/requests/:id [database error]', async () => {
            //setup
            deleteRequest.mockRejectedValue(new Error('database error'));
            const response = await request(app).delete('/api/requests/1');
            //check if response is correct
            expect(response.statusCode).toBe(500);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
            //check if database was called
            expect(deleteRequest).toHaveBeenCalledTimes(1);
        });

    });

});

