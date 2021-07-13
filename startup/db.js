const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/testDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true, 
    useCreateIndex: true 
})
.then(() => winston.info('Connected to MongoDB...'))
};