import DiaryEntry = require('../DiaryEntry/DiaryEntry');
export class BeeHive {
    constructor(public hiveNumber?: number, public hiveName?: string, 
	public startDate?: Date, public description?: string, public photo?: DiaryEntry.Photo, public lastDiaryEntryDate? : Date,
    public hiveLocation?: HiveLocation, public source?: Source, public lost?: Lost, public frameSize?: string, public otherFrameSize?:string,
	public frameMaterial?: string, public otherFrameMaterial?: string, public combConstruction?: string, 
    public otherCombConstruction?:string, public trader?:string, public lastDiaryEntryId?:string)
	{}
}

export class HiveLocation {
    constructor(public lat?: number, public lng?: number, public address?: string, public markerId?: number, public position?: any) {}
}

export class Source {
    constructor(public type?: string, public otherSource? : string, public origin?: number) {}
}

export class Lost {
    constructor(public isLost?: boolean, public reason?: string) {}
}

export const sources: string[] = ["Schwarm", "Ableger", "Gekauft", "Anderes"];
export const frameSizes: string[] = ["Zandermaß","Deutschnormalmaß","Österreichische Breitwabe","Einheitsmaß","Langstrothmaß","Dadant original","Dadant modifiziert","Kuntzsch","Schweitzermaß","Anderes"];
export const frameMaterials: string[] = ["Holz","Styropor","Anderes"];
export const combConstructions: string[] = ["Naturbau","Mittelwände","Anderes"];

/*export enum sourceEnum {
	 Schwarm, 
	 Ableger, 
	 Gekauft,
	 Anderes
}*/

/*export enum frameSizeEnum {
	Zander, 
	Deutschnormal, 
	Atbreitwabe, 
	Einheitsmas, 
	Langstrothmas, 
	Dadantoriginal,
	Dadantmodifiziert, 
	Kuntzsch, 
	Schweitzermas, 
	Anderes
}*/

/*export enum frameMaterialEnum {
	Holz, 
	Styropor,
	Anderes
}*/

/*export enum combConstructionEnum {
	Naturbau, 
	Mittelwaende, 
	Anderes
}*/