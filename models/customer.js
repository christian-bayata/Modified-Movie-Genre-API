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
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).required()
    });

    return schema.validate(customer);
};

exports.validate = validateCustomer;
exports.Customer = Customer;
    
        