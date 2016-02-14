import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class AcarianControl extends DiaryEntry {
	countDays: number;
	deadAcarians: number;
    acarianDeathValue: number;
    
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName, deadAcarians, countDays) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
       this.countDays = countDays;
       this.deadAcarians = deadAcarians;
       this.acarianDeathValue = this.getAcarianDeathValue();
    }
	
	public getAcarianDeathValue () : number {
        return this.deadAcarians / this.countDays;
	}
}