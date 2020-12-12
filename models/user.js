const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi-oid');
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
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
        maxlength: 1024
       
      }, 
    isAdmin: Boolean
});

// To embed the auth / token into User model
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin 
            }, 
            config.get('jwtPrivateKey')
            ); 
    return token;
}

const User = mongoose.model('User', userSchema);


// Example entry to test if User reaches Atlas db 
const exUser = {
    name: 'JayDub',
    email: 'JayDub@gmail.com',
    password: 'examplePassword',
    isAdmin: true
};

const newExUser = new User(exUser);

// newExUser.save((error) => {
//     if(error) {
//         console.log('newExUser DID NOT save');
//     } else {
//         console.log('newExUser SAVED! :)');
//     }
// });

function validateUser (user) {
    // Joi.object and schema.validate is new way to write
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
