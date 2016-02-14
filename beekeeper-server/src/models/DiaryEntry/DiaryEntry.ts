export class DiaryEntry {
    date: Date;
    type : entryTypeEnum;
    photos: Photo[];
    description: string;
    isMarkdownEnabled: boolean;
    beeHiveId: string;

    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId) {
       this.type = type;
	   this.date = date;
	   this.description = description;
	   this.photos = photos;
       this.isMarkdownEnabled = isMarkdownEnabled;
       this.beeHiveId = beeHiveId;
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
    id : string;
    content : Buffer;
    
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}