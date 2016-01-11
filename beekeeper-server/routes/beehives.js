//behives.js

var express = require('express');
var router = express.Router();
var config = require('./config');

//Database handeling (MongoDB)
var mongoose = require('mongoose');

var BeeHive = require('../models/BeeHive.ts');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Incoming request. - BeeHive');
    next(); // make sure we go to the next routes and don't stop here
});

/*Callable with GET on http://localhost:8080/api/BeeHives/*/
router.get('/', function(req, res) {
    res.json({ message: 'API is online and ready to receive requests! - BeeHive' });   
});


// create a new BeeHive (accessed at POST http://localhost:8080/api/BeeHives/beeHives)
router.route('/beeHives').post(function(req, res) {
        // save the BeeHive and check for errors
        var newHive = new BeeHive(); //create a new instance of the BeeHive-model
        newHive.hiveNumber = req.body.hiveNumber; // set the BeeHive's number (comes from the request)
        newHive.description = req.body.description;
        newHive.startDate = req.body.startDate;
        newHive.location.lat = req.body.location.lat;
        newHive.location.long = req.body.location.long;
        newHive.location.address = req.body.location.address;
        newHive.location.name = req.body.location.name;
        newHive.source.type = req.body.source.type;
        newHive.source.origin = req.body.source.origin;
        newHive.lost.isLost = req.body.lost.isLost;
        newHive.lost.reason = req.body.lost.reason;
        newHive.frameSize = req.body.frameSize;
        newHive.frameMaterial = req.body.frameMaterial;
        newHive.combConstruction = req.body.combConstruction;
    
        newHive.save(function(err) {
            if(err){
                console.log('Error at creating a new BeeHive.');
                res.send(err);
            } else {
                console.log('New BeeHive succesfully created.');
                res.json({message: 'BeeHive created!' });
            }
        });
    });
    
// gets all BeeHives (accessed at GET http://localhost:8080/api/BeeHives/beeHives)    
router.route('/beeHives').get(function(req, res) {
        BeeHive.find(function(err, users) {
            if(err) {
                res.send(err);
                console.log('Error at getting all BeeHives.');
            } else {
                res.json(users);
                console.log('All BeeHives succesfully returned.');
            }
        })
    });
  
module.exports = router;

/*var sourceEnum;
(function (sourceEnum) {
    sourceEnum[sourceEnum["swarm"] = 0] = "swarm";
    sourceEnum[sourceEnum["branch"] = 1] = "branch";
    sourceEnum[sourceEnum["bought"] = 2] = "bought";
    sourceEnum[sourceEnum["other"] = 3] = "other";
})(sourceEnum || (sourceEnum = {}));
;
var frameSizeEnum;
(function (frameSizeEnum) {
    frameSizeEnum[frameSizeEnum["zander"] = 0] = "zander";
    frameSizeEnum[frameSizeEnum["deutschnormal"] = 1] = "deutschnormal";
    frameSizeEnum[frameSizeEnum["atbreitwabe"] = 2] = "atbreitwabe";
    frameSizeEnum[frameSizeEnum["einheitsmas"] = 3] = "einheitsmas";
    frameSizeEnum[frameSizeEnum["langstrothmas"] = 4] = "langstrothmas";
    frameSizeEnum[frameSizeEnum["dadantoriginal"] = 5] = "dadantoriginal";
    frameSizeEnum[frameSizeEnum["dadantmodifiziert"] = 6] = "dadantmodifiziert";
    frameSizeEnum[frameSizeEnum["kuntzsch"] = 7] = "kuntzsch";
    frameSizeEnum[frameSizeEnum["schweitzermas"] = 8] = "schweitzermas";
    frameSizeEnum[frameSizeEnum["other"] = 9] = "other";
})(frameSizeEnum || (frameSizeEnum = {}));
var frameMaterialEnum;
(function (frameMaterialEnum) {
    frameMaterialEnum[frameMaterialEnum["wood"] = 0] = "wood";
    frameMaterialEnum[frameMaterialEnum["styrofoam"] = 1] = "styrofoam";
    frameMaterialEnum[frameMaterialEnum["other"] = 2] = "other";
})(frameMaterialEnum || (frameMaterialEnum = {}));
var combConstructionEnum;
(function (combConstructionEnum) {
    combConstructionEnum[combConstructionEnum["naturbau"] = 0] = "naturbau";
    combConstructionEnum[combConstructionEnum["mittelwaende"] = 1] = "mittelwaende";
    combConstructionEnum[combConstructionEnum["other"] = 2] = "other";
})(combConstructionEnum || (combConstructionEnum = {}));*/