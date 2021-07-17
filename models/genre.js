const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = new mongoose.model('Genre', genreSchema);

//Input validation with Joi

// async function createGenre() {
//     const genre = new Genre({
//         name: "Sci-Fi"
//     })
//     const result = await genre.save();
// };


function validateGenre(genre) {
    const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
    }); 
    return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;