// users.js

var express = require('express');
var router = express.Router();
var config = require('./config');

//Database handeling (MongoDB)
var mongoose = require('mongoose');
var mongoDB = mongoose.connect('mongodb://localhost:27017/beesaver-db');
//var mongoDB = mongoose.connect('mongodb://bees:Bees123@ds037005.mongolab.com:37005/beesaver-db').connection; //connect to our database

var User = require('../models/user');


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
        var user = new User(); //create a new instance of the user-model
        user.name = req.body.name; // set the user name (comes from the request)
        user.email = req.body.email;
        user.password = req.body.password;
        
        user.save(function(err) {
            if(err){
                console.log('Error at creating a new User.');
                res.send(err);
            } else {
                console.log('New User succesfully created.');
                res.json({message: 'User created!' });
            }
        });
    });
    
// gets all users (accessed at GET http://localhost:8080/api/users)    
router.route('/users').get(function(req, res) {
        User.find(function(err, users) {
            if(err) {
                res.send(err);
                console.log('Error at getting all Users.');
            } else {
                res.json(users);
                console.log('All Users succesfully returned.');
            }
        })
    });
    
// get exactly one user by id(accesed at GET http://localhost:8080/api/users/:user_id)
router.route('/users/:user_id').get(function(req, res) {     
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
                console.log('Error at getting one specific User by Id.');
            } else {
                res.json(user);
                console.log('One specific User by Id succesfully returned.')
            }
        })
    });
    
// update a single users info by id (accesed at PUT http://localhost:8080/api/users/:user_id)
router.route('/users/:user_id').put(function(req, res) {
        // use our user-model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err) {
                res.send(err);
                console.log('Error at updating one specific User.');
            } else {
                //Update the users info
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;
                //save the user
                user.save(function(err) {
                   if(err) {
                       res.send(err);
                   } else {
                       res.json({message: 'User updated!' });
                   }
                });
                console.log('One specific User by Id succesfully updated.')
            }
        });
    });
    
// delete a single users info by id (accesed at DELETE http://localhost:8080/api/users/:user_id)
router.route('/users/:user_id').delete(function(req, res) {
        User.remove( {
            _id: req.params.user_id
        }, function(err) {
            if(err) {
                res.send(err);
                console.log('Error at deleting one single User by id.')
            } else {
                res.json({message: 'User succesfully deleted.'});
            }
        });
    });
 
module.exports = router;