///<reference path='../typings/node/node.d.ts'/>
///<reference path='../typings/express/express.d.ts'/>
///<reference path='../typings/mongodb/mongodb.d.ts'/>

import User = require('./model/model/User/User');
import Utilities = require('./model/utilities/Utilities');
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
    public isTokenValid (token : string, callback: (value: string, err: any) => void) : void {
        var newUser;
        request.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token, (error, response, body) => {
           console.log('AUTHENTICATE USER');
           if(error == null && response.statusCode == 200) {
               console.log(JSON.stringify(response.body));
               console.log('Geht ins IF!');
               database.collection('Users', (error, users) => {
                    if (error) {
                        console.log('Fehler beim finden der Collection User.');
                        console.error(error);
                        callback("", error);
                    } else {
                        console.log('BEGINNE NUN AUTH-Datenbankhandling!');
                        newUser = new User.User(response.body.sub, response.body.email, token, response.body.name);
                        console.log('Neuer User: ' + newUser);
                        users.update({"googleId" : response.body.sub}, {"googleId" : response.body.sub, "email" : response.body.email, "token" : token, "name" : response.body.name}, {upsert : true}, (error, user) => {
                            if (error) {
                                console.log('Error at Upserting a specific User by GoogleID.');
                                console.log(error);
                                callback("", error);
                            } else {
                                console.log('IM LETZTEN ELSE.');
                                callback(newUser.googleId, "");
                            }
                        });
                    }
                });
           }
        });
	}
}