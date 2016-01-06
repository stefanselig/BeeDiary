//models/DiaryEntry.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiaryEntrySchema   = new Schema({
    entryType: String,
    entryDate: Date,
    entryDescription: String,
    photos: String
});

module.exports = mongoose.model('DiaryEntry', DiaryEntrySchema);