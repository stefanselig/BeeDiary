class AcarianControl extends DiaryEntry {
	countDays: number;
	acariansCaseOfDeath: number;
    
    constructor(type, photos, description, date, acariansDied, countDays) {
       super(type, photos, description, date);
       this.countDays = countDays;
       this.acariansCaseOfDeath = acariansDied;
    }
	
	public getAcarianDeathValue () : number {
        return this.acariansCaseOfDeath / this.countDays;
	}
}