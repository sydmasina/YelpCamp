const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//Sets up our cloudinary instance account, not included in docs
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'Yelpcamp',  //Folder in cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg']
    },
})

module.exports = {
    cloudinary,
    storage
}