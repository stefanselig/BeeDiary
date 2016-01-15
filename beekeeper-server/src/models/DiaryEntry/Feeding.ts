import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class Feeding extends DiaryEntry {
    typeOfFood: typeOfFoodEnum;
    amount: number;
    proportion: string;
    
    constructor(type, photos, description, date, typeOfFood, amount, proportion) {
       super(type, photos, description, date);
       this.typeOfFood = typeOfFood;
       this.amount = amount;
       this.proportion = proportion;
    }
    
    getTypeOfFoodEnum() : string[] {
        return this.getArrayOfEnum(typeOfFoodEnum);
    }
    
}

enum typeOfFoodEnum {
	sugar, other
}