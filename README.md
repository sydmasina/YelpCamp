# YelpCamp
YelpCamp is is a collection of campground locations.  

## What it does:
It implements full CRUD operations where:  
- Users can View existing campgrounds, Create, Edit and Delete Campgrounds their on campgrounds. 
- They can also leave a review or delete a review.  
- Users must be Authenticated (Logged-in) and Authorized to add or delete a review, to create, edit or delete a campground. 
- It uses a Mapbox REST API to display Clusters of all the campgrounds on a map. Where each Cluster density is differentiated by colors. Geocoding is used to estimate and pin point locations on the map.


## This App was built using:
- Node.js
- Express
- MongoDb
- Mongoose
- Multiple NPM packages
- Cloud services such as: Cloudinary and Heroku


## Getting Started:
- You have to install all the mentioned packages on the package.json file
- Add your own env file that defines the variables: 
  - CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY and CLOUDINARY_SECRET (Cloudinary is where the images will be loaded, but you can use a different api if needed)
  - MAPBOX_TOKEN (needed for the Map API, visit Mapbox for more details)
  - DB_URK (specify the Database URL you're using)


## Note:
This project is still a working progress. So if you find a bug, please reach out to me. 
I'll do my best to resolve any bugs reported. Thanks :)
