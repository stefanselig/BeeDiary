class DiaryEntry {
    date: Date;
    type : entryTypeEnum;
    photos: Photo[];
    description: string;

    constructor(type, photos, description, date) {
       this.type = type;
	   this.date = date;
	   this.description = description;
	   this.photos = photos;
    }
    
    getEntryTypeEnum() : string[] {
        return this.getArrayOfEnum(entryTypeEnum);
    }
    
    getArrayOfEnum(MyEnum) : string[] {
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

class Photo {
    id: number;
    photo: string;
}