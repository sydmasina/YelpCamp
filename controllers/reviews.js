const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res)=>{
    const id = req.params.id;
    const campground = await Campground.findById(id);
    const {body, rating} = req.body;
    const newReview = new Review({body, rating});
    newReview.author = req.user._id;
    await campground.reviews.push(newReview);
    await newReview.save();
    await campground.save();
    req.flash('success', 'Review submitted!')
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteReview = async (req, res)=>{
    const {id, reviewId} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash('deleted', 'Review deleted!')
    res.redirect(`/campgrounds/${id}`);
}
