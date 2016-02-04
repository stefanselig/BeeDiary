import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class CutDroneBrood extends DiaryEntry {
    
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
    }
}