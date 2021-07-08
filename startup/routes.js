const express = require('express');
const error = require('../middleware/error');
const movies = require('../routes/movie');
const rentals = require('../routes/rental');
const genres = require('../routes/genre');
const users = require('../routes/users');
const auth = require('../routes/auth');
const customers = require('../routes/customer');

module.exports = function(app) {
    //Routes
    app.use("/api/movies", movies);
    app.use("/api/rentals", rentals);
    app.use("/api/users", users);
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/auth", auth);
    //Error Handler Middleware
    app.use(error);
};