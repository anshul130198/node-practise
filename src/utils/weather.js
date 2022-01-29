const request = require('postman-request');
const baseUrl = "http://api.weatherstack.com/";
const apiKey = "8ab28039dd6ecd4c2ab0a4a9172e66ec";

// const url = 'http://api.weatherstack.com/current?access_key=8ab28039dd6ecd4c2ab0a4a9172e66ec&query=New%20York';


const forecast = (latitude, longitude, callback) => {
    const url = `${baseUrl}current?access_key=${apiKey}&query=${latitude},${longitude}`;
    console.log(url);
    request({ url: url, json: true }, (error, response) => {
        // const data = JSON.parse(response.body);
        if (error) {
            callback('unable to connect', undefined)
        } else if (response.body.error) {
            callback('unable to fimd location, try another search', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                location : response.body.location.name,
                country : response.body.location.country
            })
        }
    })
}

module.exports = forecast;