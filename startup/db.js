const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = () => {
    mongoose.connect('mongodb://localhost/vizz',  { useNewUrlParser: true})
    .then(() => winston.info('Connected to MongoDB...'))
};