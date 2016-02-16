export class DiaryEntry {
    constructor(public type?: entryTypeEnum, public photos?: Photo[], public description?: string, public date?: Date, public isMarkdownEnabled?: boolean, public beeHiveId?: any) {}    
}

export class CutDroneBrood extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
    }
}

export class HoneyRemoval extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId, public amount: number) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
    }
}

export class AcarianControl extends DiaryEntry {
    acarianDeathValue: number;
    
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId, public deadAcarians: number, public countDays: number) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
       this.acarianDeathValue = this.getAcarianDeathValue();
    }
	
	public getAcarianDeathValue () : number {
        return this.deadAcarians / this.countDays;
	}
}

export class Construction extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
    }
}

export class Feeding extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId, public foodType: foodTypeEnum, public amount: number, public proportion: string) {
       super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
    }
}

export class Treatment extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId, public treatmentType : treatmentTypeEnum, public appliance : string, public treatmentBegin : Date, public treatmentEnd : Date) {
        super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
    }
}

export class Loss extends DiaryEntry {
    constructor(type, photos, description, date, isMarkdownEnabled, beeHiveId, public reason : string) {
        super(type, photos, description, date, isMarkdownEnabled, beeHiveId);
    }
}

export class Photo {
    constructor(public id: any, public content: string) {}
}

export enum treatmentTypeEnum {
	heat, acid, other
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