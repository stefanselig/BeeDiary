export class DiaryEntry {
    constructor(public mood? : boolean, public type?: string, public otherType? : string, public photos?: Photo[], public description?: string, public date?: Date, public isMarkdownEnabled?: boolean, public beeHiveId?: any, public beeHiveName? : string) {}    
}

export class CutDroneBrood extends DiaryEntry {
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
       super(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
}

export class HoneyRemoval extends DiaryEntry {
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, public amount: number) {
       super(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
}

export class AcarianControl extends DiaryEntry {
    public acarianDeathValue: number;
    
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, public deadAcarians?: number, public countDays?: number) {
       super(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
       this.acarianDeathValue = this.getAcarianDeathValue();
    }
	
	public getAcarianDeathValue () : number {
        return this.deadAcarians / this.countDays;
	}
}

export class Construction extends DiaryEntry {
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
       super(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
}

export class Feeding extends DiaryEntry {
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, public foodType?: string, public otherFood? : string, public amount?: number, public proportion?: string) {
       super(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
}

export class Treatment extends DiaryEntry {
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, public treatmentType?: string, public otherTreatment? : string, public appliance?: string, public treatmentBegin?: Date, public treatmentEnd?: Date) {
        super(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);

    }
}

export class Loss extends DiaryEntry {
    constructor(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, public reason?: string) {
        super(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
}

export class Photo {
    constructor(public id?: any, public content?: string) {}
}

export const treatmentTypes: string[] = ["Hitze","Säure","Anderes"];
export const foodTypes: string[] = ["Zucker", "Anderes"];
export const entryTypes: string[] = ["Milbenkontrolle", "Errichtung", "Behandlung", "Fütterung", "Honigentnahme", "Verlust", "Drohnenbrutausschnitt", "Anderes"];

/*
export enum treatmentTypeEnum {
	Hitze,
	Säure,
	Anderes
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
*/