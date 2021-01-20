const winston = require('winston');
const config = require('config');
const express = require('express');
const { User } = require('./models/user');
const app = express();
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

app.get('/', (req, res) => {
  User.find({})
    .then((newExUser) => {
      console.log('Success!', newExUser);
      res.json(newExUser);
    })
    .catch((error) => {
      console.log('Error!', error);
    });
});

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
