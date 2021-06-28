const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = require('./routes/movie');

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/movies", router);
app.use("api/rentals", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is currently running on ${port}...`));

module.exports = { app };