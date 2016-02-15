export class DiaryEntry {
    constructor(public type: entryTypeEnum, public photos: Photo[], public description: string, public date: Date, public isMarkdownEnabled: boolean, public beeHiveId: string) {}    
}

export class CutDroneBrood extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
    }
}

export class HoneyRemoval extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName, public amount: number) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
    }
}

export class AcarianControl extends DiaryEntry {
    acarianDeathValue: number;
    
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName, public deadAcarians: number, public countDays: number) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
       this.acarianDeathValue = this.getAcarianDeathValue();
    }
	
	public getAcarianDeathValue () : number {
        return this.deadAcarians / this.countDays;
	}
}

export class Construction extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
    }
}

export class Feeding extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveName, public foodType: foodTypeEnum, public amount: number, public proportion: string) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveName);
    }
}

export class Photo {
    constructor(public id: string, public content: string) {}
}

export enum foodTypeEnum {
	Zucker, 
	Anderes
}

export enum entryTypeEnum {
	Milbenkontrolle, 
	Errichtung, 
	Behandlung, 
	Fuetterung, 
	Honigentnahme, 
	Verlust, 
	Drohnenbrutausschnitt,
	Anderes
}