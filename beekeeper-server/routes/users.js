// users.js

var express = require('express');
var router = express.Router();
var config = require('./config');

//Database handeling (DocumentDB)
var DoQmentDB  = require('doqmentdb');          
var User = require('../models/user');            // Get model/schema
var connection = new (require('documentdb').DocumentClient)(config.db.host, {masterKey: config.db.masterKey}); // Create DocumentDB connection 
var db = new DoQmentDB(connection, 'user');  // Create DBManager 'test' 
var users = db.use('users');                    // Create CollectionManager 'users' 
users.schema(User);


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Incoming request.');
    next(); // make sure we go to the next routes and don't stop here
});

/*Callable with GET on http://localhost:8080/api/*/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests!' });   
});


// create a user (accessed at POST http://localhost:8080/api/users)
router.route('/users').post(function(req, res) {
        // save the user and check for errors
        users.create({ name: req.body.name, email: req.body.email, password: req.body.password})
        .then(console.log)
        .catch(console.log);
    });
    
// gets all users (accessed at GET http://localhost:8080/api/users)    
router.route('/users').get(function(req, res) {
        users.find({}).then(console.log);
    });
 
module.exports = router;