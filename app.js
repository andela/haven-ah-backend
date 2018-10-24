import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import config from './server/config/config'

dotenv.config();

// Set up express app
const app = express();

// Log incoming requests
app.use(logger('dev'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/api/v1', routes);

app.get('*', (request, response) => {
    const welcome = "<h1>Welcome to Authors Haven API Version 1.0</h1> ";
    response.status(200).send(welcome);
});

const env = process.env.NODE_ENV || 'development';
const port = config[env].PORT;

// Start server
app.listen(port, () => {
    console.log(`Express server listening on ${port}`);
});

export default app;
