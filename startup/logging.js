const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


module.exports = () => {
    winston.handleExceptions(
        new winston.transports.Console( { colorize: true, prettyPrint: true }),
        new winston.transports.File( { filename: 'uncaughtExceptions.log' }));
        
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    // Log errors to file and db
    winston.add(winston.transports.File, { filename: 'logfile.log'});
//     winston.add(winston.transports.MongoDB, { 
//         db: 'mongodb://localhost/vizz',
//         level: 'info'
//     });
};