var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Reviews = require('../models/reviews');
var Verify = require('./verify');

var reviewRouter = express.Router();
reviewRouter.use(bodyParser.json());

reviewRouter.route('/')

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    console.log('about to create a review '+req.body.zip + " " + req.body.make + " " + req.body.model + " " + req.body.dateReviewed + "=");
    req.body.postedBy = req.decoded._id;
    console.log("user id= " + req.body.postedBy);
    console.log("username=" + req.body.username);
    Reviews.create(req.body, function (err, review) {
        if (err) next(err);
        console.log('Review created!');
        var id = review._id;
        console.log("after getting id")
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the review with id: ' + id);
        console.log('Added the review with id: ' + id);
    });
});

module.exports = reviewRouter;
