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
}

export function getTypeOfFoodEnum() {
    return getArrayOfEnum(typeOfFoodEnum);
}

function getArrayOfEnum(MyEnum) {
    var typeOfFoodEnumArray = new Array();
    Object.keys(MyEnum)
      .filter(v => isNaN(parseInt(v, 10)))
      .forEach(v => typeOfFoodEnumArray.push(v));
    return typeOfFoodEnumArray;
}

enum typeOfFoodEnum {
	sugar, other
}