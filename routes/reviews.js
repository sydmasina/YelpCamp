const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const Campground = require('../models/campground');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews')


//-----Create New Review For A Campground, Saved As A Reference On The Campground------//
router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))


//--------Delete A Review And It's Reference On The Campground
router.delete('/:reviewId', isLoggedIn, isReviewAuthor,  wrapAsync(reviews.deleteReview))


module.exports = router;