const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/yelpcamp')
    console.log('Mongo Database connected!');
}
main().catch(err=>{
    console.log('DATABASE CONNECTION ERROR!')
    console.log(err);
});
const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedD = async()=>{
    await Campground.deleteMany({})
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*1000) + 100;
        const newCamp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(places)} ${sample(descriptors)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/djltat0ph/image/upload/v1649921906/Yelpcamp/sncpcvfb35y2qmckchov.jpg',
                    filename: 'Yelpcamp/sncpcvfb35y2qmckchov',
                  }          
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, quae.',
            price: price,
            author: '625652a9a0ce994160ed53ea',
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] }
        })
        await newCamp.save();
    }
}
seedD().then(()=>{
    mongoose.connection.close();
});