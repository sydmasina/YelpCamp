const Campground = require("./models/campground");
const Review = require('./models/review')
const {campgroundSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const {reviewSchema} = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'You are not logged in!');
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login')
    }
    next();
}

module.exports.verifyAuthor = async (req, res, next)=>{
    const {id} = req.params;
    const camp = await Campground.findById(id);
    if(!camp.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission');
        res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateCampground = (req, res, next)=>{
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permisison for that!');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}
