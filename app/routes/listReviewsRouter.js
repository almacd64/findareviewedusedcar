var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Reviews = require('../models/reviews');
var Verify = require('./verify');

var listReviewsRouter = express.Router();
listReviewsRouter.use(bodyParser.json());

console.log('in listreviewsrouter');

listReviewsRouter.route('/')
.get(function (req, res, next) {
    Reviews.find({}, function (err, reviews) {
        if (err) next(err);
        console.log("got reviews");
        res.json(reviews);
    });
})

listReviewsRouter.route('/:reviewId')
.get(function (req, res, next) {
    console.log("in listreviewrouter by id " + req.params.reviewId)
    Reviews.findById(req.params.reviewId, function (err, review) {
        if (err) next(err);
        console.log("got review" + review.make);
        res.json(review);
    });
})


module.exports = listReviewsRouter;
