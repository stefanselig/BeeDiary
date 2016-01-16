///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>

import DiaryEntry = require('../models/DiaryEntry/DiaryEntry');
import AcarianControl = require('../models/DiaryEntry/AcarianControl');
import Construction = require('../models/DiaryEntry/Construction');
import CutDroneBrood = require('../models/DiaryEntry/CutDroneBrood');
import Feeding = require('../models/DiaryEntry/Feeding');
import HoneyRemoval = require('../models/DiaryEntry/HoneyRemoval');
import Loss = require('../models/DiaryEntry/Loss');
import Treatment = require('../models/DiaryEntry/Treatment');
import mongodb = require('mongodb');

var config = require('./config');
var express = require('express');
var router = express.Router();

//Database handeling (MongoDB)
var ObjectId = mongodb.ObjectID;
var databaseServer =  new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var database = new mongodb.Db('beesaver-db', databaseServer, {w: 1});
database.open(function() {});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Incoming request. - DiaryEntry');
    next(); // make sure we go to the next routes and don't stop here
});

//Callable with GET on http://localhost:8080/api/DiaryEntries/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests! - DiaryEntry' });   
});


// create a new DiaryEntry (accessed at POST http://localhost:8080/api/DiaryEntries/diaryEntries)
router.route('/diaryEntries').post(function(req, res) {
        var OK = 'OK';
        // save the DiaryEntry and check for errors
        var newEntryPhotos = new Array<DiaryEntry.Photo>();
        switch(req.body.type) {
            case 'acarianControl': {
                var newAcarianControlEntry = new AcarianControl.AcarianControl(req.body.type, newEntryPhotos, req.body.description, req.body.date,
                req.body.acariansDied, req.body.countDays);
                var added = addNewEntry(newAcarianControlEntry);
                if(added != OK) {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (AcarianControl)' });
                }
                break;
            }
            case 'construction': {
                var newConstructionEntry = new Construction.Construction(req.body.type, newEntryPhotos, req.body.description, req.body.date, 
                req.body.swarmBought, req.body.notes);
                var added = addNewEntry(newConstructionEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Construction)' });
                }
                break;
            }
            case 'cutDroneBrood': {
                var newCutDroneBroodEntry = new CutDroneBrood.CutDroneBrood(req.body.type, newEntryPhotos, req.body.description,
                req.body.date, req.body.notes);
                var added = addNewEntry(newCutDroneBroodEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (CutDroneBrood)' });
                }
                break;
            }
            case 'other': {
                var newOtherEntry = new DiaryEntry.DiaryEntry(req.body.type, newEntryPhotos, req.body.description, req.body.date);
                var added = addNewEntry(newOtherEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Other)' });
                }
                break;
            }
            case 'feeding': {
                var newFeedingEntry = new Feeding.Feeding(req.body.type, newEntryPhotos, req.body.description, req.body.date,
                req.body.typeOfFood, req.body.amount, req.body.proportion);
                var added = addNewEntry(newFeedingEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Feeding)' });
                }
                break;
            }
            case 'honeyRemoval': {
                var newHoneyRemovalEntry = new HoneyRemoval.HoneyRemoval(req.body.type, newEntryPhotos, req.body.description, req.body.date,
                req.body.amount);
                var added = addNewEntry(newHoneyRemovalEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (HoneyRemoval)' });
                }
                break;
            }
            case 'loss': {
                var newLossEntry = new Loss.Loss(req.body.type, newEntryPhotos, req.body.description, req.body.date, req.body.reason);
                var added = addNewEntry(newLossEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Loss)' });
                }
            break;
            }
            case 'treatment': {
                var newTreatmentEntry = new Treatment.Treatment(req.body.type, newEntryPhotos, req.body.description, req.body.date,
                req.body.typeOfTreatment, req.body.appliance, req.body.beginOfTreatment, req.body.endOfTreatment);
                var added = addNewEntry(newTreatmentEntry);
            if(added != 'OK') {
                res.send(added);
            } else {
                res.json({message: 'DiaryEntry created! (Treatment)' });
            }
            break;
            }
        }
    });

//Adds a new DiaryEntry to the database.
function addNewEntry(newEntry) {
    database.collection('DiaryEntries', function(error, diaryEntries) {
            if(error) {
                console.error(error);
                return error;
            }
            diaryEntries.insertOne(newEntry, function(error, entry) {
                if(error) {
                    console.error('Error at adding a new DiaryEntry.')
                    console.error(error);
                    return error;
                } else {
                    console.log('New DiaryEntry created.');
                    return 'OK';
                }
            })
        });
        return 'OK';
}

 
// gets all DiaryEntries (accessed at GET http://localhost:8080/api/DiaryEntries/diaryEntries)    
router.route('/diaryEntries').get(function(req, res) {
        database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.find().toArray(function(error, diaryEntries) {
          if(error) {
              res.send(error);
              console.error('Error at getting all DiaryEntries.');
          } else {
          res.json(diaryEntries);
          console.log('All DiaryEntries successfully returned. (' + diaryEntries.length + ' DiaryEntries)');
          }
       });
    });
});
    
  
// get exactly one DiaryEntry by id(accessed at GET http://localhost:8080/api/DiaryEntries/diaryEntries/:entry_id)
router.route('/diaryEntries/:entry_id').get(function(req, res) { 
    database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.findOne({"_id": new ObjectId(req.params.entry_id)}, function(error, entry) {
          if(error) {
                res.send(error);
                console.log('Error at getting one specific DiaryEntry by Id.');
          } else {
          res.json(entry);
          console.log('One specific DiaryEntry by Id successfully returned.')
          }
       });
    });
});
/*
// update a single BeeHive info by id (accessed at PUT http://localhost:8080/api/BeeHives/beeHives/:hive_id)
router.route('/beeHives/:hive_id').put(function(req, res) {
       database.collection('BeeHives', function(error, beeHives) {
       if(error) {
           console.error(error);
           return;
       }
       var newHiveLocation = new BeeHive.HiveLocation(req.body.lat, req.body.long, req.body.address, req.body.markerId);
       var newSource = new BeeHive.Source(req.body.type, req.body.origin);
       var newLost = new BeeHive.Lost(req.body.isLost, req.body.reason);
        beeHives.findOneAndUpdate({"_id": new ObjectId(req.params.hive_id)},
         {
             "hiveNumber" : req.body.hiveNumber,
             "hiveName" : req.body.hiveName,
             "startDate" : req.body.startDate,
             "description" : req.body.description,
             "hiveLocation" : newHiveLocation,
             "source" : newSource,
             "lost" : newLost,
             "frameSize" : req.body.frameSize,
             "frameMaterial" : req.body.frameMaterial,
             "combConstruction" : req.body.combConstruction
            }, function(error, hive) {
            if(error) {
                res.send(error);
                console.log('Error at updating one specific BeeHive.');
            } else {
                res.json({message: 'BeeHive by Id successfully updated.' });
                console.log('One specific BeeHive by Id successfully updated.');
            }
        });
    });
});*/
    
// delete a single DiaryEntry by id (accessed at DELETE http://localhost:8080/api/DiaryEntries/diaryEntries/:entry_id)
router.route('/diaryEntries/:entry_id').delete(function(req, res) {
        database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.findOneAndDelete({"_id": new ObjectId(req.params.entry_id)}, function(error, entry) {
          if(error) {
                res.send(error);
                console.log('Error at deleting one specific DiaryEntry by Id.');
          } else {
          res.json({message: 'DiaryEntry by Id successfully deleted.'});
          console.log('One specific DiaryEntry by Id successfully deleted.')
          }
       });
    });
    });
    
module.exports = router;