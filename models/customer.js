const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = new mongoose.model('Customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        //Default value is set to false unless set otherwise
        default: false
    },
    Phone: {
        type: Number,
        required: true,
        min: 5, 
        max: 50
    }
}));

async function createCustomer() {
    const customer = new Customer({
        name: "Jermaine",
        isGold: true,
        phone: 08024578987
    });
    const result = await customer.save();
    console.log(result);
}

createCustomer();
    
        