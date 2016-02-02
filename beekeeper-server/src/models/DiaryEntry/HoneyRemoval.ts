import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class HoneyRemoval extends DiaryEntry {
    amount: number;
    
    constructor(type, photos, description, date, isMarkdownEnabled, amount) {
       super(type, photos, description, date, isMarkdownEnabled);
       this.amount = amount;
    }
}