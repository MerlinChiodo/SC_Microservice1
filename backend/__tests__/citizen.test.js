import request from 'supertest';
import { jest } from '@jest/globals'
import citizenRouter from '../citizen/citizen.router.js';
import express from 'express';

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
app.use((req, res, next) => {
    req.citizenModel = { createCitizen, getCitizenById, getChildrenIds, hasDogPermit, getSpouseId };
    next();
});
//setup routes
app.use("/api/citizen", citizenRouter);


describe('Citizen API', () => {

    beforeEach(() => {
        createCitizen.mockClear();
        getCitizenById.mockClear();
        getChildrenIds.mockClear();
        hasDogPermit.mockClear();
        getSpouseId.mockClear();
    });

    describe('GET /api/citizen/:id', () => {

        test('/api/citizen/1 [correct id]', async () => {
            const data = { citizen_id: '1', firstname: 'John Doe' };
            getCitizenById.mockResolvedValue(data);
            const response = await request(app).get('/api/citizen/1');
            //all functions are being called
            expect(getCitizenById.mock.calls.length).toBe(1);
            //response is correct
            expect(response.statusCode).toBe(200);
            expect(response.body.firstname).toEqual(data.firstname);
        });

        test('/api/citizen/0 [wrong id]', async () => {
            const response = await request(app).get('/api/citizen/0');
            //no citizen was searched in the database
            expect(getCitizenById.mock.calls.length).toBe(0);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        test('/api/citizen/-1 [wrong id]', async () => {
            const response = await request(app).get('/api/citizen/-1');
            //no citizen was searched in the database
            expect(getCitizenById.mock.calls.length).toBe(0);
            //response is correct
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('POST /api/citizen', () => {

        test('/api/citizen [correct input]', async () => {
            //TODO write test
        });

        test('/api/citizen [wrong input]', async () => {
            //TODO write test
        });

    });

    describe('GET /api/citizen/:id/children', () => {

        test('/api/citizen/1/children [correct id]', async () => {
            //TODO write test
        });

        test('/api/citizen/0/children [wrong id]', async () => {
            //TODO write test
        });

        test('/api/citizen/-1/children [wrong id]', async () => {
            //TODO write test
        });

    });

    describe('GET /api/citizen/:id/hasDogPermit', () => {

        test('/api/citizen/1/hasDogPermit [correct id]', async () => {
            //TODO write test
        });

        test('/api/citizen/0/hasDogPermit [wrong id]', async () => {
            //TODO write test
        });

        test('/api/citizen/-1/hasDogPermit [wrong id]', async () => {
            //TODO write test
        });

    });

});