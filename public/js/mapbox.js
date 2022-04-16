
// import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 8 // starting zoom
});

//Create a marker and add it to the map.
new mapboxgl.Marker({color: '#f94144'})
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}`
    )
)
.addTo(map);

map.addControl(new mapboxgl.NavigationControl());