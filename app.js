const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views')); // After setting the engine below, we need to set another set method and passing the 'views' setting to let express know where it will find our template files that we want our templating engine to process. Then we enter a second value which is the value for the 'views' option which is a path to the folder that contains the template files.
app.set('view engine', 'ejs'); // using the set method will allow us to set certain options in this express app. In this line we're using 2 options: 1) 'view engine' which will tell express that we want to use a template engine for processing our view files before we sent them back as an html. 2) 'ejs' as this is what we installed and what template engine we planned to use.

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));

app.use('/', defaultRoutes); // This will filter ALL incoming requests, which will go directly to default.js file as that was made as the default route, and will check if any of those routes matches the incoming request. If so, the request will be executed. Otherwise, it will point the request to app.js and will again check if the routes matches the incoming request, and if so, will then execute the request. 

app.use('/', restaurantRoutes);

app.use(function (req, res) {
    res.status(404).render('404');
});

app.use(function (error, req, res, next) {
    res.status(500).render('500');
});

app.listen(3000);