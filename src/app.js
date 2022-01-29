const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geolocation');
const forecast = require('./utils/weather');

const app = express();



//Define paths for Express config

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');


hbs.registerPartials(partialsPath);

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anshul',
        footer: 'main footer'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'All kind of queries are handled here!!',
        footer: 'help footer!!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anshul',
        footer: 'about footer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You Must Provide an address!!!'
        })
    } else {
        geoCode(req.query.address, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);

            if (data && data.latitude && data.longitude) {
                forecast(data.latitude, data.longitude, (error, weatherData) => {
                    if (error) {
                        res.send({ error })
                    } else {
                        res.send({
                            feelslike: weatherData.feelsLike,
                            temperature: weatherData.temperature,
                            location: weatherData.location,
                            address: req.query.address,
                            country: weatherData.country
                        })

                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Inside Help Error Header',
        footer: 'Inside Help Error Footer'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Header',
        footer: 'Error Footer'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})