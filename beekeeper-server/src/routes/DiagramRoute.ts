///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
///<reference path='../../typings/mongodb/mongodb.d.ts'/>

import mongodb = require('mongodb');

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
    console.log('Incoming request. - Diagram');
    next(); // make sure we go to the next routes and don't stop here
});

//Callable with GET on http://localhost:8080/api/Diagrams/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests! - Diagram' });   
});

// gets Time-AcarianDeath (accessed at GET http://localhost:8080/api/Diagrams/acarianTime/:hive_id)
router.route('/acarianTime/:hiveId').get(function(req, res) {
       database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.find({type : 'Milbenkontrolle', beeHiveId : req.params.hive_id}, {date: 1, acarianDeathValue: 1}).toArray(function(error, acarianTimes) {
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
router.route('/honeyPerPopulation').get( function(req, res) {
    database.collection('DiaryEntries', function(error, diaryEntries) {
        if(error) {
            console.error(error)
            return;
        }
        diaryEntries.find({type:'Honigentnahme'},{beeHiveName : 1, amount : 1}).toArray(function(error, honeyPerPopulation) {
            if(honeyPerPopulation == null || honeyPerPopulation == undefined) {
                console.log('Error at finding honey per Population.');
            } else {
                var result = [];
            
            for(var current in honeyPerPopulation) {
                var currentInserted = false;
                for(var cr in result) {
                    if(result[cr].beeHiveName == honeyPerPopulation[current].beeHiveName) {
                        result[cr].amount += honeyPerPopulation[current].amount;
                        currentInserted = true;
                    }
                }
                if(currentInserted == false) {
                    result.push(honeyPerPopulation[current]);
                }
                
            }
            res.json(result);
            console.log('Honey per Population/BeeHive successfully returned. (' + result.length + ' Entries in Array)');
            }
        });
    });
});

// gets Honey for one Population (accessed at GET http://localhost:8080/api/Diagrams/honeyForPopulation/:hive_id)  
router.route('/honeyForPopulation/:hive_id').get(function(req, res) {
        database.collection('DiaryEntries', function(error, diaryEntries) {
       if(error) {
           console.error(error);
           return;
       } 
       diaryEntries.find({type: 'Honigentnahme', beeHiveId : req.params.hive_id}, {date: 1, amount: 1}).toArray(function(error, honeyForPopulation) {
          if(error) {
              res.send(error);
              console.error('Error at getting Honey for one Population/BeeHive.');
          } else {
          res.json(honeyForPopulation);
          console.log('Honey for one Population/BeeHive successfully returned. (' + honeyForPopulation.length + ' Entries in Array)');
          }
       });
    });
});

    
module.exports = router;