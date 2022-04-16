const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const Campground = require('../models/campground');
const wrapAsync = require('../utils/wrapAsync');
const flash = require('connect-flash');
const passport = require('passport');
const {isLoggedIn, verifyAuthor, validateCampground} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});



//---Routes With '/' In Common, but different methods
router.route('/')
    .get(wrapAsync(campgrounds.index)) //Display All Campgrounds Route-----//
    .post(isLoggedIn, upload.array('image'), validateCampground,  wrapAsync(campgrounds.createCampground))    //Create New Campground Route----//
            //isLoggedIn -> Miiddleware that checks if user is logged in
            //validateCampground -> Middleware that validates the form values
            //upload.array('image') -> Uploads image(s) to Cloudinary, returns Url and filename

//-----Get Form For Creating New Campground Route-----//
router.get('/new', isLoggedIn, wrapAsync(campgrounds.newCampgroundForm))


//----Routes With '/:id' in common---///
router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground)) //Show Campground Details-----//
    .delete(isLoggedIn, verifyAuthor, 
        wrapAsync(campgrounds.deleteCampground)) //Delete Campground Route-----//


//-----Routes with '/:id/edit' in common----//
router.route('/:id/edit')
    .get(isLoggedIn, verifyAuthor, wrapAsync(campgrounds.editCampgroundForm)) //Get Campground Edit Form Route-----//
    .put(isLoggedIn, verifyAuthor, upload.array('image'), validateCampground, 
        wrapAsync(campgrounds.updateCampground))  //Update Campground Route-----//



module.exports = router;