const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    }
});

//create a function for user authentication and token generation;
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'jwt_PrivateKey') 
    return token;
};
const User = new mongoose.model('User', userSchema)
    
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    })   

    return schema.validate(user);
};

exports.validate = validateUser;
exports.User = User;