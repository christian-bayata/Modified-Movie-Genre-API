const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const movies = require('./routes/movie');
const rentals = require('./routes/rental');
const genres = require('./routes/genre');
const users = require('./routes/users');
const auth = require('./routes/auth');
const customers = require('./routes/customer');
const app = express();

mongoose.connect('mongodb://localhost:27017/testDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true 
})
.then(() => console.log("Connected to mongoDB..."))
.catch((err) => console.log("Not connected to mongoDB...", err));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is currently running on ${port}...`));

