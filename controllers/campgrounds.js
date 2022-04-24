const Campground = require('../models/campground');
const mbxGeocoding =require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});
const {cloudinary} = require('../cloudinary');

module.exports.index = async (req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

module.exports.newCampgroundForm = async (req, res)=>{
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next)=>{
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send()
    const newCamp = new Campground(req.body); //Creates new instance of a Campground.
    newCamp.geometry = geoData.body.features[0].geometry;
    newCamp.images = req.files.map(f => ({url: f.path, filename: f.filename})); //Maps url to path variable from req.files, and maps filename to filename variable from req.files
    newCamp.author = req.user._id; //Saves logged in user _id.
    await newCamp.save();
    console.log(newCamp);
    req.flash('success', 'Successfully created a new Campground!');
    res.redirect(`/campgrounds/${newCamp._id}`);
}

module.exports.showCampground = async (req, res)=>{
    const id = req.params.id;
    const campground = await (await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })).populate('author');
    if(!campground){
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

module.exports.editCampgroundForm = async(req, res)=>{
    const id = req.params.id;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}

module.exports.updateCampground = async(req, res)=>{
    const id = req.params.id;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, {...req.body});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(campground);
    }
    
    req.flash('success', 'Successfully updated Campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res)=>{
    const id = req.params.id;
    const campgrgound = await Campground.findByIdAndDelete(id);
    req.flash('deleted', `${campgrgound.title} Campground deleted!`);
    res.redirect('/campgrounds');
}



