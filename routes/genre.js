const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema, Genre, validate } = require('../models/genre');

router.get('/', async (req, res) => {
    const genre = await Genre.find().sort('name');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(400).send('Invlid input');

    genre.name = req.body.name
    genre.save()

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findOneAndDelete(req.params.id);
    if(!genre) return res.status(400).send('Invlid input');
    
    res.send(genre);
})

module.exports = router;

