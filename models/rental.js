const mongoose = require('mongoose');
const Joi = require('joi');

//Schemas
const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
     movie: {
         type: new mongoose.Schema({
             title: {
                type: String,
                trim: true,
                required: true,
                minlength: 5,
                maxlength: 50
     
             },
             dailyRental: {
                 type: Number,
                 required: true,
                 min: 0,
                 max: 255
             },
             dateOut: {
                type: Date,
                required: true,
                default: Date.now()
             },
             dateReturned: {
                 type: Date,
             },
             rentalFee: {
                 type: Number,
                 min: 0
             }          
            }),
         required: true
     }
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()              
    })   

    return schema.validate(rental);
};

exports.validate = validateRental();
exports.Rental = Rental;