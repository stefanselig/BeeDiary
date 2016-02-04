import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class HoneyRemoval extends DiaryEntry {
    amount: number;
    
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName, amount) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
       this.amount = amount;
    }
}