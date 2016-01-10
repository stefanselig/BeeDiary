import mongoose = require("mongoose");

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

export var diaryEntrySchema = new mongoose.Schema({
    _type: Type,
	_date: Date,
	_description: String,
	_photos: Photo[]
});
 
export interface IDiaryEntry extends mongoose.Document {
    _type: Type;
	_date: Date;
	_description: string;
	_photos: Photo[];
}