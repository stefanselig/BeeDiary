import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class AcarianControl extends DiaryEntry {
	countDays: number;
	deadAcarians: number;
    
    constructor(type, photos, description, date, deadAcarians, countDays) {
       super(type, photos, description, date);
       this.countDays = countDays;
       this.deadAcarians = deadAcarians;
    }
	
	public getAcarianDeathValue () : number {
        return this.deadAcarians / this.countDays;
	}
}