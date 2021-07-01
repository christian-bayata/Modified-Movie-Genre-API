const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Movie, validate } = require('.././models/movie');


router.get('/', async(req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

router.post('/:id', async(req, res) => {
    const { error } =  validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);
    
    const genre = Movie.findById(req.body.genreId);     
    if(!genre) return res.status(404).send("Invalid genre");
    
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })  
    
    movie = await movie.save();
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    let movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("Movie not found"); 

    movie.set({
        title: req.body.title, 
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
     });  
    
    await movie.save();

    res.send(movie);
})
module.exports = router;