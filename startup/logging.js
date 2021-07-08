const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
    throw ex;
    });

    const p = Promise.reject(new Error("Something failed terribly"));
    p.then(() => console.log('Done'));

    winston.add(winston.transports.File, { filename: 'logFile.log' });
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost:27017/testDB' });
}