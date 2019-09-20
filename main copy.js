const placesGeojson = require('./placesGeojson.json');
const fs = require('fs');
const config = require('./config');
const places = placesGeojson.features.filter((point) => /Wave|Starbucks|Coffee|Cafe/.test(point.properties.Title));
const data = JSON.stringify({
    type: 'FeatureCollection',
    features: places
});
fs.writeFile(`${config.ROOT_DIRECTORY}/result.json`, data, (err) => {
    console.log(err);
});
console.log(places.length);
