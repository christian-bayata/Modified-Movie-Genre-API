const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Rental, validate } = require('.././models/rental');
const Joi = require('joi');

router.get('/', async((req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
}));

router.post('/:id', async(req, res) => {
    //validate the user input
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid request");
    
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid request");

    if(movie.numberInStock === 0) {
        return res.status(404).send("The movie is not available for rental");
    }
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie : {
            _id: movie._id,
            title: movie.title,
            dailyRental: movie.dailyRental
        }
    });
    rental = await rental.save();

    //After renting a movie, the movie number drops
    movie.numberInStock--
    movie.save()

    res.send(rental);
})