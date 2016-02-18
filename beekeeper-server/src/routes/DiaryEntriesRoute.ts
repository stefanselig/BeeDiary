///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>

import DiaryEntry = require('./../../../beekeeper-shared/model/DiaryEntry/DiaryEntry');
import Utilities = require('./../../../beekeeper-shared/utilities/Utilities');
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
        if (req.body.type == undefined) {
            req.body.type = "Anderes";
        }
        var newEntryPhotos = new Array<DiaryEntry.Photo>();
        newEntryPhotos = req.body.photos;
        for(var currPhotoID in req.body.photos) {
            if(newEntryPhotos[currPhotoID].id == 0) {
                newEntryPhotos[currPhotoID].id = new ObjectId();
            }
        }
        switch(req.body.type) {
            case 'Milbenkontrolle': {
                var newAcarianControlEntry = new DiaryEntry.AcarianControl(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date, req.body.isMarkdownEnabled,
                req.body.beeHiveId, req.body.beeHiveName, req.body.deadAcarians, req.body.countDays);
                var added = addNewEntry(newAcarianControlEntry);
                if(added != OK) {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (AcarianControl)' });
                }
                break;
            }
            case 'Errichtung': {
                var newConstructionEntry = new DiaryEntry.Construction(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date, req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName);
                var added = addNewEntry(newConstructionEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Construction)' });
                }
                break;
            }
            case 'Drohnenbrutausschnitt': {
                var newCutDroneBroodEntry = new DiaryEntry.CutDroneBrood(req.body.type, req.body.otherType, newEntryPhotos, req.body.description,
                req.body.date, req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName);
                var added = addNewEntry(newCutDroneBroodEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (CutDroneBrood)' });
                }
                break;
            }
            case 'Anderes': {
                var newOtherEntry = new DiaryEntry.DiaryEntry(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date, req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName);
                var added = addNewEntry(newOtherEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Other)' });
                }
                break;
            }
            case 'Fuetterung': {
                var newFeedingEntry = new DiaryEntry.Feeding(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date,
                req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName, req.body.foodType, req.body.amount, req.body.proportion);
                var added = addNewEntry(newFeedingEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Feeding)' });
                }
                break;
            }
            case 'Honigentnahme': {
                var newHoneyRemovalEntry = new DiaryEntry.HoneyRemoval(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date,
                req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName, req.body.amount);
                var added = addNewEntry(newHoneyRemovalEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (HoneyRemoval)' });
                }
                break;
            }
            case 'Verlust': {
                var newLossEntry = new DiaryEntry.Loss(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date, req.body.isMarkdownEnabled,
                req.body.beeHiveId, req.body.beeHiveName, req.body.reason);
                var added = addNewEntry(newLossEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Loss)' });
                }
            break;
            }
            case 'Behandlung': {
                var newTreatmentEntry = new DiaryEntry.Treatment(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date,
                req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName, req.body.treatmentType, req.body.otherTreatment, req.body.appliance, req.body.treatmentBegin, req.body.treatmentEnd);
                var added = addNewEntry(newTreatmentEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Treatment)' });
                }
                break;
            }
            default : {
                var newOtherEntry = new DiaryEntry.DiaryEntry(req.body.type, req.body.otherType, newEntryPhotos, req.body.description, req.body.date, req.body.isMarkdownEnabled, req.body.beeHiveId, req.body.beeHiveName);
                var added = addNewEntry(newOtherEntry);
                if(added != 'OK') {
                    res.send(added);
                } else {
                    res.json({message: 'DiaryEntry created! (Other)' });
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

// update a single DiaryEntries info by id (accessed at PUT http://localhost:8080/api/DiaryEntries/diaryEntries/:entry_id
router.route('/diaryEntries/:entry_id').put(function(req, res) {
    database.collection('DiaryEntries', function(error, diaryEntries) {
        if(error) {
            console.error(error);
            return;
        }
                // save the DiaryEntry and check for errors
        if (req.body.type == undefined) {
            req.body.type = "Anderes";
        }
        var updateEntryPhotos = new Array<DiaryEntry.Photo>();
        updateEntryPhotos = req.body.photos;
        for(var currPhotoID in req.body.photos) {
            if(updateEntryPhotos[currPhotoID].id == 0) {
                updateEntryPhotos[currPhotoID].id = new ObjectId();
            }
        }
        switch(req.body.type) {
            case 'Milbenkontrolle': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType": req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName,
                "countDays" : req.body.countDays,
                "deadAcarians" : req.body.deadAcarians
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Errichtung': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Drohnenbrutausschnitt': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Anderes': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Fuetterung': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName,
                "foodType" : req.body.foodType,
                "otherFood" : req.body.otherFood,
                "amount" : req.body.amount,
                "proportion" : req.body.proportion
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Honigentnahme': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName,
                "amount" : req.body.amount
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Verlust': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName,
                "reason" : req.body.reason
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            case 'Behandlung': {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName,
                "treatmentType" : req.body.treatmentType,
                "otherTreatment" : req.body.otherTreatment,
                "appliance" : req.body.appliance,
                "treatmentBegin" : req.body.treatmentBegin,
                "treatmentEnd" : req.body.treatmentEnd
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            }
            default : {
                diaryEntries.findOneAndUpdate({"_id": new ObjectId(req.params.entry_id)},
                 {
                "date" : req.body.date,
                "type" : req.body.type,
                "otherType" : req.body.otherType,
                "description" : req.body.description,
                "photos" : updateEntryPhotos,
                "isMarkdownEnabled" : req.body.isMarkdownEnabled,
                "beeHiveId" : req.body.beeHiveId,
                "beeHiveName" : req.body.beeHiveName
                }, function(error, entry) {
                if(error) {
                    res.send(error);
                    console.log('Error at updating one specific DiaryEntry.');
                } else {
                    res.json({message: 'DiaryEntry by Id successfully updated.' });
                    console.log('One specific DiaryEntry by Id successfully updated.');
                }
                });
                break;
            } 
        }
    }) 
});
    
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

// deletes one specific photo of an diaryentry (accessed at GET http://localhost:8080/api/DiaryEntries/deleteOnePhoto)    
router.route('/deleteOnePhoto').get(function(req, res) {
    database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.updateOne({"_id": new ObjectId(req.params.entry_id)}, { $pull: { "photos.id" : req.body.photoId}}, function(error, entry) {
          if(error) {
                res.send(error);
                console.log('Error at deleting one Photo.');
          } else {
          res.json({message: 'One Photo successfully deleted.'});
          console.log('One specific Photo successfully deleted.')
          }
       });
    });
});

// adds one specific photo of an diaryentry (accessed at GET http://localhost:8080/api/DiaryEntries/addOnePhoto)    
router.route('/addOnePhoto').get(function(req, res) {
       database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       var newPhoto = new DiaryEntry.Photo(new ObjectId(), req.body.photo);
       diaryEntries.updateOne({"_id": new ObjectId(req.params.entry_id)}, { $addToSet: { photos : newPhoto}}, function(error, entry) {
          if(error) {
                res.send(error);
                console.log('Error at adding one Photo.');
          } else {
          res.json({message: 'One Photo successfully added.'});
          console.log('One specific Photo successfully added.')
          }
       });
    });
});

    
// gets all Members of the DiaryEntry-EntryTypeENUM (accessed at GET http://localhost:8080/api/DiaryEntries/typeEnum)    
router.route('/typeEnum').get(function(req, res) {
        res.json(Utilities.getArrayOfEnum(DiaryEntry.entryTypeEnum));
});

// gets all Members of the DiaryEntry-Feeding-typeOfFoodEnum (accessed at GET http://localhost:8080/api/DiaryEntries/foodEnum)    
router.route('/foodEnum').get(function(req, res) {
        res.json(Utilities.getArrayOfEnum(DiaryEntry.foodTypeEnum));
});

// gets all Members of the DiaryEntry-Treatment-treatmentTypeEnum (accessed at GET http://localhost:8080/api/DiaryEntries/treatmentEnum)    
router.route('/treatmentEnum').get(function(req, res) {
        res.json(Utilities.getArrayOfEnum(DiaryEntry.treatmentTypeEnum));
});
    
module.exports = router;