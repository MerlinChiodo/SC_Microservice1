import 'dotenv/config'; //load environment variables
import * as path from 'path';
import citizenRouter from './citizen/citizen.router.js';
import permitRouter from './permits/permits.router.js';
import requestRouter from './requests/requests.router.js';
import * as citizenModel from './citizen/citizen.model.js';
import * as permitModel from './permits/permits.model.js';
import * as requestModel from './requests/requests.model.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// setup express app
const app = express();

// use morgan to log requests to the console
app.use(morgan('dev'));
// serve files from the public directory
app.use(express.static('../public'));
// allow sending and recieving json
app.use(express.json());
// needed to handle forms correctly
app.use(express.urlencoded({ extended: true }));
// enable CORS
app.use(cors());

//pass database as middleware to all routes
//this way the database can be mocked in tests
app.use((req, res, next) => {
    req.citizenModel = citizenModel;
    req.permitModel = permitModel;
    req.requestModel = requestModel;
    next();
});
// setup API routes
app.use("/api/citizen", citizenRouter);
app.use("/api/permits", permitRouter);
app.use("/api/requests", requestRouter);

// fix react routing
const __dirname = path.resolve();
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//get port from environment variables or use default
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => {
    console.log(`Websever is ready at port ${port}`);
})
