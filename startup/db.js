const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
const config = require('config');

module.exports = () => {
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}
