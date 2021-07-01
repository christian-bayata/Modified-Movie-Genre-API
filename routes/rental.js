const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/', async(req, res) => {
    //validate the user input
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Customer invalid request");
    
    const movie = await Movie.findById(req.body.movieId);    
    if(!movie) return res.status(400).send("Movie invalid request");

    if(movie.numberInStock === 0) {
        return res.status(400).send("The movie is not available for rental");
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
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    // await rental.save();

    // movie.numberInStock--
    // movie.save(rental)
    
    // res.send(rental);
    
    //After renting a movie, use fawn to perform a transaction based on a two-phase commit
    try{ 
        let task = Fawn.Task()

        task.save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock : -1 }})
            .run()
    
        res.send(rental);    
    }
    catch(exc) {
        res.status(500).send("Oops, please be patient, something went wrong")
    }
})

module.exports = router;