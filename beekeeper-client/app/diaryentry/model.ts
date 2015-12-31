export class DiaryEntry {
	_type: Type;
	_date: Date;
	_description: string;
	_photos: Photo[];
}

class Type {
	_type: typeEnum;
	_value: string;
}

enum typeEnum {
	acarianControl, construction, treatment, feeding, honeyRemoval, loss, cutDroneBrood, other
}

class AcarianControl {
	_countDays: number;
	_acariansCaseOfDeath: number;
	
	public getAcarianDeathValue () : number {
		return this._countDays / this._acariansCaseOfDeath;
	}
}

class Construction {}

class Treamtent {}

class Feeding {}

class HoneyRemoval {}

class Loss {}

class CutDroneBrood {}

class Other {}

class Photo {}