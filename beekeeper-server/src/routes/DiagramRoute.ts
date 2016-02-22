///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>

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
    console.log('Incoming request. - BeeHive');
    next(); // make sure we go to the next routes and don't stop here
});

//Callable with GET on http://localhost:8080/api/Diagrams/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests! - BeeHive' });   
});

// gets Time-AcarianDeath (accessed at GET http://localhost:8080/api/Diagrams/acarianTime)
// Parameter: hiveName to get the Died Acarians per Time    
router.route('/acarianTime').get(function(req, res) {
       database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.find({type : 'acarianControl', beeHiveName : req.body.hiveName}, {date: 1, acarianDeathValue: 1}).toArray(function(error, acarianTimes) {
          if(error) {
              res.send(error);
              console.error('Error at getting Time-AcarianDeath.');
          } else {
          res.json(acarianTimes);
          console.log('Time-AcarianDeath successfully returned. (' + acarianTimes.length + ' Entries in Array)');
          }
       });
    });
});

// gets Honey per BeePopulation (accessed at GET http://localhost:8080/api/Diagrams/honeyPerPopulation)    
router.route('/honeyPerPopulation').get(function(req, res) {
        database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.find({type: 'honeyRemoval'}, {beeHiveName: 1, amount: 1}).toArray(function(error, honeyPerPopulation) {
          if(error) {
              res.send(error);
              console.error('Error at getting Honey per Population/BeeHive.');
          } else {
          res.json(honeyPerPopulation);
          console.log('Honey Per Population/BeeHive successfully returned. (' + honeyPerPopulation.length + ' Entries in Array)');
          }
       });
    });
});

// gets Honey for one Population (accessed at GET http://localhost:8080/api/Diagrams/honeyForPopulation)    
router.route('/honeyForPopulation').get(function(req, res) {
        database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.find({type: 'honeyRemoval', beeHiveName: req.body.hiveName}, {date: 1, amount: 1}).toArray(function(error, honeyForPopulation) {
          if(error) {
              res.send(error);
              console.error('Error at getting Honey for one Population/BeeHive.');
          } else {
          res.json(honeyForPopulation);
          console.log('Honey for one Population/BeeHive successfully returned.. (' + honeyForPopulation.length + ' Entries in Array)');
          }
       });
    });
});

    
module.exports = router;