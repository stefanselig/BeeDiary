// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var users = require('./routes/users');
 
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/', users);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Express running on port ' + port);