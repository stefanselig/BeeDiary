//diaryentries.js

var express = require('express');
var router = express.Router();
var config = require('./config');

//Database handeling (MongoDB)
var mongoose = require('mongoose');
var DiaryEntry = require('../models/DiaryEntry');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Incoming request. - DiaryEntry');
    next(); // make sure we go to the next routes and don't stop here
});

/*Callable with GET on http://localhost:8080/api/DiaryEntries*/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests! - DiaryEntry' });   
});


// create a new DiaryEntry (accessed at POST http://localhost:8080/api/DiaryEntries/diaryEntries)
router.route('/diaryEntries').post(function(req, res) {
        // save the DiaryEntry and check for errors
        var newEntry = new DiaryEntry(); //create a new instance of the DiaryEntry-model
        newEntry.entryType = req.body.entryType; // set the DiaryEntry's type (comes from the request)
        newEntry.entryDate = req.body.entryDate;
        newEntry.entryDescription = req.body.entryDescription;
        newEntry.photos = req.body.photos;
            
        newEntry.save(function(err) {
            if(err){
                console.log('Error at creating a new DiaryEntry.');
                res.send(err);
            } else {
                console.log('New DiaryEntry succesfully created.');
                res.json({message: 'DiaryEntry created!' });
            }
        });
    });
    
// gets all DiaryEntries (accessed at GET http://localhost:8080/api/DiaryEntries/diaryEntries)    
router.route('/diaryEntries').get(function(req, res) {
        DiaryEntry.find(function(err, users) {
            if(err) {
                res.send(err);
                console.log('Error at getting all DiaryEntries.');
            } else {
                res.json(users);
                console.log('All DiaryEntries succesfully returned.');
            }
        })
    });
  
module.exports = router;

/*(function (typeEnum) {
                typeEnum[typeEnum["acarianControl"] = 0] = "acarianControl";
                typeEnum[typeEnum["construction"] = 1] = "construction";
                typeEnum[typeEnum["treatment"] = 2] = "treatment";
                typeEnum[typeEnum["feeding"] = 3] = "feeding";
                typeEnum[typeEnum["honeyRemoval"] = 4] = "honeyRemoval";
                typeEnum[typeEnum["loss"] = 5] = "loss";
                typeEnum[typeEnum["cutDroneBrood"] = 6] = "cutDroneBrood";
                typeEnum[typeEnum["other"] = 7] = "other";
            })(typeEnum || (typeEnum = {}));
            AcarianControl = (function () {
                function AcarianControl() {
                }
                AcarianControl.prototype.getAcarianDeathValue = function () {
                    return this._countDays / this._acariansCaseOfDeath;
                };
                return AcarianControl;
            })();*/
            