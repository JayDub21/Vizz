const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
    // Joi.object and schema.validate is new way to write
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    return schema.validate(genre)
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;