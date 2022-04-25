
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// setup express app
const app = express();
const hostname = 'localhost';
const port = 4000;

// use morgan to log requests to the console
app.use(morgan('dev'));
// server files from the public directory
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'));
// allow sending and recieving json
app.use(express.json());
// needed to handle forms correctly
app.use(express.urlencoded({ extended: true }));

// start server
app.listen(port, hostname, () => {
    console.log(`Websever is ready at http://${hostname}:${port}`);
})
