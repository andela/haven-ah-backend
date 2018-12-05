import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import passport from 'passport';
import swaggerDocument from './swagger';
import config from './server/config/config';

import {
  goodHttpResponse,
  badHttpResponse
} from './server/utilities/httpResponse';

import router from './server/routes/index';
import cleanStrings from './server/middlewares/cleanStrings';

dotenv.config();

// Set up express app
const app = express();

// Log incoming requests
app.use(logger('dev'));

// CORS configuration
app.use(cors());

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cleanStrings);
app.use(passport.initialize());
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/api/v1', router);

app.get('/', (request, response) => {
  const welcome = 'Welcome to Authors Haven API Version 1.0';
  return goodHttpResponse(response, 200, welcome);
});

app.all('*', (request, response) => {
  const message = 'We cant seem to find what you are looking for.';
  return badHttpResponse(response, 404, message);
});

const env = process.env.NODE_ENV || 'development';
const port = config[env].PORT;

// Start server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Express server listening on ${port}`);
});

export default app;
