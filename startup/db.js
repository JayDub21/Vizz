const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
const config = require('config');
require('dotenv').config();



module.exports = () => {
    const db = config.get('db');
    // function switcher() {
    //     if(process.env.NODE_ENV == 'production'){
    //         return process.env.MONGODB_URI
    //     }
    //     else{
    //         return db;
    //     }
    // };

    mongoose.connect(process.env.MONGODB_URI || db )
    .then(() => winston.info(`Connected to ${process.env.MONGODB_URI}...`));
}




