import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import config from './server/config/config';
import { goodHttpResponse } from './server/utilities/httpResponse';

import router from './server/routes/users';
import cleanStrings from './server/middlewares/cleanStrings';

dotenv.config();

// Set up express app
const app = express();

// Log incoming requests
app.use(logger('dev'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cleanStrings);

app.use('/api/v1', router);

app.get('*', (request, response) => {
  const welcome = 'Welcome to Authors Haven API Version 1.0';
  return goodHttpResponse(response, 200, welcome);
});

const env = process.env.NODE_ENV || 'development';
const port = config[env].PORT;

// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
