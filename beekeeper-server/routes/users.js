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
    
// get exactly one user by id(accesed at GET http://localhost:8080/api/users/:user_id)
router.route('/users/:user_id').get(function(req, res) {        
        users.findById(req.params.user_id).then(console.log);
    });
    
// update a single users info by id (accesed at PUT http://localhost:8080/api/users/:user_id)
router.route('/users/:user_id').put(function(req, res) {
        //JUST A SCAFFHOLDER!!
        users.update({ name: req.params.user_id, admin: true }, { admin: false }).then(console.log); 
    });
    
// delete a single users info by id (accesed at DELETE http://localhost:8080/api/users/:user_id)
router.route('/users/:user_id').delete(function(req, res) {
        //JUST A SCAFFHOLDER!!
        users.findAndRemove({ name: req.params.user_id }).then(console.log);
    });
 
module.exports = router;