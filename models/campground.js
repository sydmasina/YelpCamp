const { string } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review');
const {Schema} = mongoose;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_300')
})
ImageSchema.virtual('thumbnail2').get(function(){
    return this.url.replace('/upload', '/upload/ar_16:9,c_fill');
})

const opts = { toJSON: { virtuals: true}};

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: String,
    reviews: [
        {
        type: Schema.Types.ObjectId, 
        ref: 'Review'
        }
    ]
}, opts);


campgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<a class="text-decoration-none" href="/campgrounds/${this._id}"><b>${this.title}</b><a/>
    <p>${this.description.substring(0,25)}...</p>`;
})

campgroundSchema.post('findOneAndDelete', async function(campgrgound){
    if(campgrgound.reviews.length){
        const res = await Review.deleteMany({_id: {$in: campgrgound.reviews}})
    }
})

const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;