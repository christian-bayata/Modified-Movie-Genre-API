const privates = require('../config/privates');
require('dotenv').config();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    //The validate function here is not to validate a new user;
    //It is rather to validate the email and password povided by the user.
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //validate user by his email
    let user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send("Invalid email or password");
    
    //Use bcrypt.compare() to validate user password
    //bcrypt.compare(plaintextpassword, hashedpassword)    
    const passwordValidate = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValidate) return res.status(400).send("Invalid email or password");

    //Generate a token
    const token = jwt.sign({ _id: user._id }, 'jwt_PrivateKey') 
        res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    })   

    return schema.validate(req);
};

module.exports = router; 
        
