import 'dotenv/config'; //load environment variables
import express from 'express';
import morgan from 'morgan';

// setup express app
const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 4000;

// use morgan to log requests to the console
app.use(morgan('dev'));
// serve files from the public directory
app.use(express.static('../public'));
// allow sending and recieving json
app.use(express.json());
// needed to handle forms correctly
app.use(express.urlencoded({ extended: true }));

// start server
app.listen(port, hostname, () => {
    console.log(`Websever is ready at http://${hostname}:${port}`);
})
