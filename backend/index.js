import 'dotenv/config'; //load environment variables
import citizenRouter from './citizen/citizen.router.js';
import permitRouter from './permits/permits.router.js';
import * as citizenModel from './citizen/citizen.model.js';
import * as permitModel from './permits/permits.model.js';
import express from 'express';
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

//pass database as middleware to all routes
//this way the database can be mocked in tests
app.use((req, res, next) => {
    req.citizenModel = citizenModel;
    req.permitModel = permitModel;
    next();
});
// setup routes
app.use("/api/citizen", citizenRouter);
app.use("/api/permits", permitRouter);

//get port from environment variables or use default
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => {
    console.log(`Websever is ready at port ${port}`);
})
