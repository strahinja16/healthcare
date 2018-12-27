const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('services/logger');
const router = require('./routes');
require('models');

const app = express();

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.url}`);
    next();
  });
}

app.use('/', router);

/**
 * Exports express
 * @public
 */
module.exports = app;
