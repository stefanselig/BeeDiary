/// <reference path="../typings/node/node.d.ts"/>
// server.js
// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // set our port
// ROUTES FOR OUR API
// =============================================================================
//var users = require('./routes/usersRoute');
var beeHives = require('./routes/beeHivesRoute');
var diaryEntries = require('./routes/diaryEntriesRoute');
var diagrams = require('./routes/diagramRoute');
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api/Users/', users);
app.use('/api/BeeHives/', beeHives);
app.use('/api/DiaryEntries/', diaryEntries);
app.use('/api/Diagrams/', diagrams);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Express running on port ' + port);
//# sourceMappingURL=server.js.map