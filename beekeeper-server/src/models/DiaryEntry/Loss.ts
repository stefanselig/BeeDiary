import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class Loss extends DiaryEntry {
    reason: string;
    
    constructor(type, photos, description, date, reason) {
       super(type, photos, description, date);
       this.reason = reason;
    }
}