const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require ('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Server is currently running on ${port}...`));
