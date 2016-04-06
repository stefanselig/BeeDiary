/// <reference path="../typings/node/node.d.ts"/>
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var beeHives = require('./routes/beeHivesRoute');
var diaryEntries = require('./routes/diaryEntriesRoute');
var diagrams = require('./routes/diagramRoute');
/** Setting up the server: */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
var port = process.env.PORT || 8080;
/** Setting up the routes: */
app.use('/api/BeeHives/', beeHives);
app.use('/api/DiaryEntries/', diaryEntries);
app.use('/api/Diagrams/', diagrams);
/** Start server */
app.listen(port);
console.log('Express running on port ' + port);
