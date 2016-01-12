class DiaryEntry {
    hiveNumber: number;
    startDate: Date;
    type : entryTypeEnum;

    constructor(hiveNumber, startDate, description) {
       type: Type,
	   date: Date,
	   description: String,
	   photos: Photo[]
    }
    
    getSourceEnum() : string[] {
        return this.getArrayOfEnum(Source);
    }
    
    getFrameSizeEnum() : string[] {
        return this.getArrayOfEnum(FrameSize);
    }
    
    getFrameMaterialEnum() : string[] {
        return this.getArrayOfEnum(FrameMaterial);
    }
    
    getCombConstructionEnum() : string[] {
        return this.getArrayOfEnum(CombConstruction);
    }
    
    private getArrayOfEnum(MyEnum) : string[] {
        var enumArray:string[];
        for(var enumMember in MyEnum) {
            enumArray.push(enumMember);
        }
        return enumArray;
    }    
}

enum entryTypeEnum {
	acarianControl, construction, treatment, feeding, honeyRemoval, loss, cutDroneBrood, other
}



class Construction {}

class Feeding {}

class HoneyRemoval {}

class Loss {}

class CutDroneBrood {}

class Other {}

class Photo {}