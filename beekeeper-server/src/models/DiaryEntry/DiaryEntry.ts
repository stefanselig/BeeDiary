export class DiaryEntry {
    date: Date;
    type : entryTypeEnum;
    photos: Photo[];
    description: string;
    isMarkdownEnabled: boolean; //Still to add in rest.

    constructor(type, photos, description, date) {
       this.type = type;
	   this.date = date;
	   this.description = description;
	   this.photos = photos;
    }    
}

export function getEntryTypeEnum() {
    return getArrayOfEnum(entryTypeEnum);
}

function getArrayOfEnum(MyEnum) {
    var entryTypeEnumArray = new Array();
    Object.keys(MyEnum)
      .filter(v => isNaN(parseInt(v, 10)))
      .forEach(v => entryTypeEnumArray.push(v));
    return entryTypeEnumArray;
}

enum entryTypeEnum {
	acarianControl, construction, treatment, feeding, honeyRemoval, loss, cutDroneBrood, other
}

export class Photo {
    id : number;
    content : string;
}