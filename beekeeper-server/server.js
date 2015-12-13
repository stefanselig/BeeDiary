var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 8080; 
app.listen(port);