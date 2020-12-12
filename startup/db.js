const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
require('dotenv').config();



module.exports = () => {
    const db = config.get('db');
    function switcher() {
        if(process.env.NODE_ENV == 'production'){
            const client = new MongoClient(MONGOOSE_URI, { useNewUrlParser: true });
            client.connect(err => {
              const collection = client.db("test").collection("devices");
              // perform actions on the collection object
              client.close();
            });
        }
        else{
            return db;
        }
    };
    mongoose.connect(switcher())
    .then(() => winston.info(`Connected to ${switcher()}...`));
}






