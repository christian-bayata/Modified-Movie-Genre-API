const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema, Genre } = require('./genre');

const Movie = mongoose.model('Movie',  new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    }, 
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

// async function createMovie() {
//     const movie = new Movie({
//         title: "Prison Break",
//         genre: new Genre({
//             name: "Season/Action"
//         }),
//         numberInStock: 27,    
//         dailyRentalRate: 15
//     });
//     const result = await movie.save();
// };


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        // genreId: Joi.number().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()       
    })

    return schema.validate(movie);
};

exports.validate = validateMovie;
exports.Movie = Movie;