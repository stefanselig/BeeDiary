///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>
var DiaryEntry = require('../models/DiaryEntry/DiaryEntry');
var AcarianControl = require('../models/DiaryEntry/AcarianControl');
var Construction = require('../models/DiaryEntry/Construction');
var CutDroneBrood = require('../models/DiaryEntry/CutDroneBrood');
var Feeding = require('../models/DiaryEntry/Feeding');
var HoneyRemoval = require('../models/DiaryEntry/HoneyRemoval');
var Loss = require('../models/DiaryEntry/Loss');
var Treatment = require('../models/DiaryEntry/Treatment');
var mongodb = require('mongodb');
var config = require('./config');
var express = require('express');
var router = express.Router();
//Database handeling (MongoDB)
var ObjectId = mongodb.ObjectID;
var databaseServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var database = new mongodb.Db('beesaver-db', databaseServer, { w: 1 });
database.open(function () { });
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Incoming request. - DiaryEntry');
    next(); // make sure we go to the next routes and don't stop here
});
//Callable with GET on http://localhost:8080/api/DiaryEntries/
router.get('/', function (req, res) {
    res.json({ message: 'API is online and ready to receive requests! - DiaryEntry' });
});
// create a new DiaryEntry (accessed at POST http://localhost:8080/api/DiaryEntries/diaryEntries)
router.route('/diaryEntries').post(function (req, res) {
    var OK = 'OK';
    // save the DiaryEntry and check for errors
    var newEntryPhotos = new Array();
    switch (req.body.type) {
        case 'acarianControl': {
            var newAcarianControlEntry = new AcarianControl.AcarianControl(req.body.type, newEntryPhotos, req.body.description, req.body.date, req.body.deadAcarians, req.body.countDays);
            var added = addNewEntry(newAcarianControlEntry);
            if (added != OK) {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (AcarianControl)' });
            }
            break;
        }
        case 'construction': {
            var newConstructionEntry = new Construction.Construction(req.body.type, newEntryPhotos, req.body.description, req.body.date);
            var added = addNewEntry(newConstructionEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (Construction)' });
            }
            break;
        }
        case 'cutDroneBrood': {
            var newCutDroneBroodEntry = new CutDroneBrood.CutDroneBrood(req.body.type, newEntryPhotos, req.body.description, req.body.date);
            var added = addNewEntry(newCutDroneBroodEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (CutDroneBrood)' });
            }
            break;
        }
        case 'other': {
            var newOtherEntry = new DiaryEntry.DiaryEntry(req.body.type, newEntryPhotos, req.body.description, req.body.date);
            var added = addNewEntry(newOtherEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (Other)' });
            }
            break;
        }
        case 'feeding': {
            var newFeedingEntry = new Feeding.Feeding(req.body.type, newEntryPhotos, req.body.description, req.body.date, req.body.foodType, req.body.amount, req.body.proportion);
            var added = addNewEntry(newFeedingEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (Feeding)' });
            }
            break;
        }
        case 'honeyRemoval': {
            var newHoneyRemovalEntry = new HoneyRemoval.HoneyRemoval(req.body.type, newEntryPhotos, req.body.description, req.body.date, req.body.amount);
            var added = addNewEntry(newHoneyRemovalEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (HoneyRemoval)' });
            }
            break;
        }
        case 'loss': {
            var newLossEntry = new Loss.Loss(req.body.type, newEntryPhotos, req.body.description, req.body.date, req.body.reason);
            var added = addNewEntry(newLossEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (Loss)' });
            }
            break;
        }
        case 'treatment': {
            var newTreatmentEntry = new Treatment.Treatment(req.body.type, newEntryPhotos, req.body.description, req.body.date, req.body.treatmentType, req.body.appliance, req.body.treatmentBegin, req.body.treatmentEnd);
            var added = addNewEntry(newTreatmentEntry);
            if (added != 'OK') {
                res.send(added);
            }
            else {
                res.json({ message: 'DiaryEntry created! (Treatment)' });
            }
            break;
        }
    }
});
//Adds a new DiaryEntry to the database.
function addNewEntry(newEntry) {
    database.collection('DiaryEntries', function (error, diaryEntries) {
        if (error) {
            console.error(error);
            return error;
        }
        diaryEntries.insertOne(newEntry, function (error, entry) {
            if (error) {
                console.error('Error at adding a new DiaryEntry.');
                console.error(error);
                return error;
            }
            else {
                console.log('New DiaryEntry created.');
                return 'OK';
            }
        });
    });
    return 'OK';
}
// gets all DiaryEntries (accessed at GET http://localhost:8080/api/DiaryEntries/diaryEntries)    
router.route('/diaryEntries').get(function (req, res) {
    database.collection('DiaryEntries', function (error, diaryEntries) {
        if (error) {
            console.error(error);
            return;
        }
        diaryEntries.find().toArray(function (error, diaryEntries) {
            if (error) {
                res.send(error);
                console.error('Error at getting all DiaryEntries.');
            }
            else {
                res.json(diaryEntries);
                console.log('All DiaryEntries successfully returned. (' + diaryEntries.length + ' DiaryEntries)');
            }
        });
    });
});
// get exactly one DiaryEntry by id(accessed at GET http://localhost:8080/api/DiaryEntries/diaryEntries/:entry_id)
router.route('/diaryEntries/:entry_id').get(function (req, res) {
    database.collection('DiaryEntries', function (error, diaryEntries) {
        if (error) {
            console.error(error);
            return;
        }
        diaryEntries.findOne({ "_id": new ObjectId(req.params.entry_id) }, function (error, entry) {
            if (error) {
                res.send(error);
                console.log('Error at getting one specific DiaryEntry by Id.');
            }
            else {
                res.json(entry);
                console.log('One specific DiaryEntry by Id successfully returned.');
            }
        });
    });
});
// update a single DiaryEntries info by id (accessed at PUT http://localhost:8080/api/DiaryEntries/diaryEntries/:entry_id
router.route('/diaryEntries/:entry_id').put(function (req, res) {
    database.collection('DiaryEntries', function (error, diaryEntries) {
        if (error) {
            console.error(error);
            return;
        }
        switch (req.body.type) {
            case 'acarianControl': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos,
                    "countDays": req.body.countDays,
                    "deadAcarians": req.body.deadAcarians
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'construction': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'cutDroneBrood': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'other': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'feeding': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos,
                    "foodType": req.body.foodType,
                    "amount": req.body.amount,
                    "proportion": req.body.proportion
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'honeyRemoval': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos,
                    "amount": req.body.amount
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'loss': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos,
                    "reason": req.body.reason
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
            case 'treatment': {
                diaryEntries.findOneAndUpdate({ "_id": new ObjectId(req.params.entry_id) }, {
                    "date": req.body.date,
                    "type": req.body.type,
                    "description": req.body.description,
                    "photos": req.body.photos,
                    "treatmentType": req.body.treatmentType,
                    "appliance": req.body.appliance,
                    "treatmentBegin": req.body.treatmentBegin,
                    "treatmentEnd": req.body.treatmentEnd
                }, function (error, entry) {
                    if (error) {
                        res.send(error);
                        console.log('Error at updating one specific DiaryEntry.');
                    }
                    else {
                        res.json({ message: 'DiaryEntry by Id successfully updated.' });
                        console.log('One specific DiaryEntry by Id successfully updated.');
                    }
                });
                break;
            }
        }
    });
});
// delete a single DiaryEntry by id (accessed at DELETE http://localhost:8080/api/DiaryEntries/diaryEntries/:entry_id)
router.route('/diaryEntries/:entry_id').delete(function (req, res) {
    database.collection('DiaryEntries', function (error, diaryEntries) {
        if (error) {
            console.error(error);
            return;
        }
        diaryEntries.findOneAndDelete({ "_id": new ObjectId(req.params.entry_id) }, function (error, entry) {
            if (error) {
                res.send(error);
                console.log('Error at deleting one specific DiaryEntry by Id.');
            }
            else {
                res.json({ message: 'DiaryEntry by Id successfully deleted.' });
                console.log('One specific DiaryEntry by Id successfully deleted.');
            }
        });
    });
});
// gets all Members of the DiaryEntry-EntryTypeENUM (accessed at GET http://localhost:8080/api/DiaryEntries/typeEnum)    
router.route('/typeEnum').get(function (req, res) {
    res.json(DiaryEntry.getEntryTypeEnum());
});
// gets all Members of the DiaryEntry-Feeding-typeOfFoodEnum (accessed at GET http://localhost:8080/api/DiaryEntries/foodEnum)    
router.route('/foodEnum').get(function (req, res) {
    res.json(Feeding.getTypeOfFoodEnum());
});
// gets all Members of the DiaryEntry-Treatment-treatmentTypeEnum (accessed at GET http://localhost:8080/api/DiaryEntries/treatmentEnum)    
router.route('/treatmentEnum').get(function (req, res) {
    res.json(Treatment.getTreatmentTypeEnum());
});
module.exports = router;
//# sourceMappingURL=DiaryEntriesRoute.js.map