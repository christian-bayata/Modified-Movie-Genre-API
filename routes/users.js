const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Find the users by one of their properties
    let user = await User.findOne({ email: req.body.email })
    if(User) res.status(400).send("User already exists");
    
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.save(user);
})

module.exports = router;