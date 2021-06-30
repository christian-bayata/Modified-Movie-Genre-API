const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Customer, validate } = require('../models/customer');

router.get('/', (req, res) => {
    let customer = Customer.find().sort('name');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = await validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone
    });

    await customer.save();
    res.send(customer);
});

module.exports = router;