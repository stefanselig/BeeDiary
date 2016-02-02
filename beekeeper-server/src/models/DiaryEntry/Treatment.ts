import DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;

export class Treatment extends DiaryEntry {
    treatmentType: treatmentTypeEnum;
    appliance: string;
    treatmentBegin: Date;
    treatmentEnd : Date;
    
    constructor(type, photos, description, date, isMarkdownEnabled, treatmentType, appliance, treatmentBegin, treatmentEnd) {
       super(type, photos, description, date, isMarkdownEnabled);
       this.treatmentType = treatmentType;
       this.appliance = appliance;
       this.treatmentBegin = treatmentBegin;
       this.treatmentEnd = treatmentEnd;
    }
}

export function getTreatmentTypeEnum() {
    return getArrayOfEnum(treatmentTypeEnum);
}

function getArrayOfEnum(MyEnum) {
    var typeOfTreatmentEnumArray = new Array();
    Object.keys(MyEnum)
      .filter(v => isNaN(parseInt(v, 10)))
      .forEach(v => typeOfTreatmentEnumArray.push(v));
    return typeOfTreatmentEnumArray;
}

enum treatmentTypeEnum {
	heat, acid, other
}