const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
// const config = require('config');
require('dotenv').config();

module.exports = () => {
   

    mongoose.connect(process.env.MONGODB_URI)
    .then(() => winston.info(`Connected to ${process.env.MONGODB_URI}...`));

}

