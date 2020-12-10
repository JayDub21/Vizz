const Joi = require('joi-oid');
const moment = require('moment');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
const { error } = validateReturn(req.body);
if (error) return res.status(400).send(error.details[0].message);
  

const rental = await Rental.findOne({
    'customer._id': req.body.customerId,
    'movie._id': req.body.movieId,
});
if (!rental) return res.status(404).send('Rental not found.');

if (rental.dateReturned) return res.status(400).send('Return already processed');

rental.dateReturned = new Date();
const rentalDays = moment().diff(rental.dateOut, 'days') ;
rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
await rental.save();

await Movie.update({ _id: rental.movie._id }, {
    $inc: {numberInStock: 1}
});

return res.status(200).send(rental);

});

const validateReturn = (req) => {
    // Joi.object and schema.validate is new way to write
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });

    return schema.validate(req)
};

module.exports = router;