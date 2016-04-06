/// <reference path="../typings/node/node.d.ts"/>
const express    = require('express');        
const app        = express();        
const bodyParser = require('body-parser');
const cors       = require('cors');

const beeHives = require('./routes/beeHivesRoute');
const diaryEntries = require('./routes/diaryEntriesRoute');
const diagrams = require('./routes/diagramRoute');

/** Setting up the server: */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const port = process.env.PORT || 8080;

/** Setting up the routes: */
app.use('/api/BeeHives/', beeHives);
app.use('/api/DiaryEntries/', diaryEntries);
app.use('/api/Diagrams/', diagrams);

/** Start server */
app.listen(port);
console.log('Express running on port ' + port);