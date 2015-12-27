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
              // get an instance of the express Router
var users = require('./routes/users');

// test route to make sure everything is working (accessed at GET http://localhost:8080/users)
/*router.get('/', function(req, res) {
    res.json({ message: 'REST is working and ready to handle requests.' });   
});*/

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/', users);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Express running on port ' + port);