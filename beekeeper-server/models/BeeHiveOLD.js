//models/BeeHive.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BeeHiveSchema   = new Schema({
    hiveNumber: Number,
    source: String,
    description: String,
    startDate: Date,
    frameSize: String,
    frameMaterial: String,
    combConstruction: String,
    lost: Boolean
});

module.exports = mongoose.model('BeeHive', BeeHiveSchema);