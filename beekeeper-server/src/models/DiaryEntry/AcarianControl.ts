class AcarianControl extends DiaryEntry {
	_countDays: number;
	_acariansCaseOfDeath: number;
	
	public getAcarianDeathValue () : number {
		return this._countDays / this._acariansCaseOfDeath;
	}
}