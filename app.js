const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const movies = require('./routes/movie');
const rentals = require('./routes/rental');
const users = require('./routes/users');
const customers = require('./routes/customer')
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/customers", customers)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is currently running on ${port}...`));

