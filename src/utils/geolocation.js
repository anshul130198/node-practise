const request = require('postman-request')


const geoCode = (address, callback) => {

    const geoloactionApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5zaHVsMTMwMSIsImEiOiJja3liZzRiaWwwZjdwMnZuMGZpNW43eWNiIn0.lxbAfDhtZaR7xCGO57jTEg&limit=1`

    request({ url: geoloactionApiUrl, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to fimd location, try another search', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].geometry.coordinates[0],
                latitude: response.body.features[0].geometry.coordinates[1],
                place: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode;
