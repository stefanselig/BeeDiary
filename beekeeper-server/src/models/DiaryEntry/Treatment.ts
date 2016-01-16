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
    
    getTypeOfTreatmentEnum() : string[] {
        return this.getArrayOfEnum(typeOfTreatmentEnum);
    }
}

enum typeOfTreatmentEnum {
	heat, acid, other
}