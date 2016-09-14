// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var reviewsSchema = new Schema({
    zip: {
        type: String,
        required: true,
        unique: false
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true
    },mileage: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    dateReviewed: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Reviews = mongoose.model('Reviews', reviewsSchema);

// make this available to our Node applications
module.exports = Reviews;