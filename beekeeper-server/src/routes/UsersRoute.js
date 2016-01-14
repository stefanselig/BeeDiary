///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>
// users.js
var User = require('../models/User');
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var databaseServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var database = new mongodb.Db('beesaver-db', databaseServer, { w: 1 });
database.open(function () { });
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Incoming request.');
    next(); // make sure we go to the next routes and don't stop here
});
/*Callable with GET on http://localhost:8080/api/*/
router.get('/', function (req, res) {
    res.json({ message: 'API is online and ready to receive requests! - User' });
});
// create a user (accessed at POST http://localhost:8080/api/users)
router.route('/users').post(function (req, res) {
    // save the user and check for errors
    console.log(req.body);
    var user = new User.User(req.body.name, req.body.email, req.body.password); //create a new instance of the user-model
    console.log(JSON.stringify(user));
    database.collection('Users', function (error, users) {
        if (error) {
            console.error(error);
            return;
        }
        users.insertOne(user, function (error, user) {
            if (error) {
                console.error('Error at adding a new User.');
                console.error(error);
                res.send(error);
                return;
            }
            else {
                res.json({ message: 'User created!' });
                console.log('New User created.');
            }
            //callback(user);
        });
    });
});
// gets all users (accessed at GET http://localhost:8080/api/users)    
router.route('/users').get(function (req, res) {
    database.collection('Users', function (error, users) {
        if (error) {
            console.error(error);
            return;
        }
        users.find(function (error, users) {
            if (error) {
                res.send(error);
                console.error('Error at getting all Users.');
            }
            else {
                res.json(users);
                console.log('All Users succesfully returned.');
            }
        });
    });
});
module.exports = router;
//# sourceMappingURL=usersRoute.js.map