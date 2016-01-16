import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class Treatment extends DiaryEntry {
    typeOfTreatment: typeOfTreatmentEnum;
    appliance: string;
    beginOfTreatment: Date;
    endOfTreatment: Date;
    
    constructor(type, photos, description, date, typeOfTreatment, appliance, beginOfTreatment, endOfTreatment) {
       super(type, photos, description, date);
       this.typeOfTreatment = typeOfTreatment;
       this.appliance = appliance;
       this.beginOfTreatment = beginOfTreatment;
       this.endOfTreatment = endOfTreatment;
    }
}

export function getTypeOfTreatmentEnum() {
    return getArrayOfEnum(typeOfTreatmentEnum);
}

function getArrayOfEnum(MyEnum) {
    var typeOfTreatmentEnumArray = new Array();
    Object.keys(MyEnum)
      .filter(v => isNaN(parseInt(v, 10)))
      .forEach(v => typeOfTreatmentEnumArray.push(v));
    return typeOfTreatmentEnumArray;
}

enum typeOfTreatmentEnum {
	heat, acid, other
}