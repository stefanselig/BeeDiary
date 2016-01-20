import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class Feeding extends DiaryEntry {
    foodType : foodTypeEnum;
    amount : number;
    proportion : string;
    
    constructor(type, photos, description, date, foodType, amount, proportion) {
       super(type, photos, description, date);
       this.foodType = foodType;
       this.amount = amount;
       this.proportion = proportion;
    }
}

export function getTypeOfFoodEnum() {
    return getArrayOfEnum(foodTypeEnum);
}

function getArrayOfEnum(MyEnum) {
    var typeOfFoodEnumArray = new Array();
    Object.keys(MyEnum)
      .filter(v => isNaN(parseInt(v, 10)))
      .forEach(v => typeOfFoodEnumArray.push(v));
    return typeOfFoodEnumArray;
}

enum foodTypeEnum {
	sugar, other
}