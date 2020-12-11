const winston = require('winston');
const config = require("config");
const Joi = require('joi-oid');
const express = require('express');
const app = express();
require('dotenv').config();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();



const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);


module.exports = server;