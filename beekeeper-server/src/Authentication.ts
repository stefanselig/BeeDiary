///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/express/express.d.ts'/>
///<reference path='../typings/mongodb/mongodb.d.ts'/>

import User = require('./../../beekeeper-shared/build-server/User/User');
import Utilities = require('./../../beekeeper-shared/build-server/Utilities');
import mongodb = require('mongodb');

var express = require('express');
var router = express.Router();
var request = require('request');

//Database handeling (MongoDB)
var ObjectId = mongodb.ObjectID;
var databaseServer =  new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var database = new mongodb.Db('beesaver-db', databaseServer, {w: 1});
database.open(function() {});


export class Authentication {
    public isTokenValid (token : string) : string {
        request.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token, function(error, response, body) {
           console.log('AUTHENTICATE USER');
           if(!error && response.code == 200) {
               database.collection('Users', function(error, users) {
                if(error) {
                    console.error(error);
                    return 'Error';
                } 
                users.findOne({"googleId": response.body.sub}, function(error, user) {
                if(error) {
                    console.log('Error at getting a specific User by GoogleID.');
                    return 'Error';
                } else {
                    var newUser = new User.User(response.body.sub, response.body.email, token, response.body.name);
                    if(user == null) {
                        users.insertOne(newUser);
                    } else {
                        users.updateOne({"googleId" : response.body.sub}, newUser);
                    }
                    return newUser.googleId;
                }
                });
                });
           }
        });
        return 'Error';
	}
}