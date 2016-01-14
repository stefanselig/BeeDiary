///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>
// users.js

import User = require('../models/User');
import mongodb = require('mongodb');


var express = require('express');
var router = express.Router();
var databaseServer =  new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var database = new mongodb.Db('beesaver-db', databaseServer, {w: 1});
database.open(function() {});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Incoming request.');
    next(); // make sure we go to the next routes and don't stop here
});

/*Callable with GET on http://localhost:8080/api/*/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests! - User' });   
});


// create a user (accessed at POST http://localhost:8080/api/users)
router.route('/users').post(function(req, res) {
        // save the user and check for errors
        console.log(req.body);
        var user = new User.User(req.body.name, req.body.email, req.body.password);  //create a new instance of the user-model
        console.log(JSON.stringify(user));
        
        database.collection('Users', function(error, users) {
            if(error) {
                console.error(error);
                return;
            }
            users.insertOne(user, function(error, user) {
                if(error) {
                    console.error('Error at adding a new User.')
                    console.error(error);
                    res.send(error);
                    return;
                } else {
                    res.json({message: 'User created!' });
                    console.log('New User created.');
                }
                //callback(user);
            })
        });
});
    
 // gets all users (accessed at GET http://localhost:8080/api/users)    
router.route('/users').get(function(req, res) {
    database.collection('Users', function(error, users) {
       if(error) {
           console.error(error);
           return;
       } 
       users.find(function(error, users) {
          if(error) {
              res.send(error);
              console.error('Error at getting all Users.');
          } else {
              var jsonString = getJSONDataAsString(users.toArray());
              console.log(jsonString);
              res.json(jsonString);
              console.log('All Users succesfully returned.');
          }
       });
    })
});

/*
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
 */

function getJSONDataAsString(arrayOfUsers) {
    var jsonArray: any[];
    for(var currentUser in arrayOfUsers) {
        jsonArray.push(JSON.parse(currentUser));
    }
    return JSON.stringify(jsonArray);
}

module.exports = router;