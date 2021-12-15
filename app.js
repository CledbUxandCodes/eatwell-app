const fs = require('fs');

const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views')); // After setting the engine below, we need to set another set method and passing the 'views' setting to let express know where it will find our template files that we want our templating engine to process. Then we enter a second value which is the value for the 'views' option which is a path to the folder that contains the template files.
app.set('view engine', 'ejs'); // using the set method will allow us to set certain options in this express app. In this line we're using 2 options: 1) 'view engine' which will tell express that we want to use a template engine for processing our view files before we sent them back as an html. 2) 'ejs' as this is what we installed and what template engine we planned to use.

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/restaurants', function (req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedrestaurants = JSON.parse(fileData);

    res.render('restaurants', {
        numberOfRestaurants: storedrestaurants.length,
        restaurants: storedrestaurants
    });
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/recommend', function (req, res) {
    res.render('recommend');
});

app.post('/recommend', function (req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedrestaurants = JSON.parse(fileData);

    storedrestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedrestaurants));

    res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
    res.render('confirm');
});



app.listen(3000);