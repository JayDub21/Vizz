const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
const config = require('config');

module.exports = () => {
   
    // const db = config.get('db');

    // mongoose.connect(MONGODB_URI)
    // .then(() => winston.info(`Connected to ${db}...`));

    mongoose.connect(
        MONGODB_URI || "mongodb://localhost/vizz")
        .then(() => console.log(`Connected to ${MONGODB_URI}...`))
        .catch(err => console.log(err));
}

