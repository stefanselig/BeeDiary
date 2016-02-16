export class BeeHive {
    constructor(public hiveNumber?: number, public hiveName?: string, 
	public startDate?: Date, public description?: string, public hiveLocation?: HiveLocation, 
	public source?: Source, public lost?: Lost, public frameSize?: frameSizeEnum, 
	public frameMaterial?: frameMaterialEnum, public combConstruction?: combConstructionEnum)
	{}
}

export class HiveLocation {
    constructor(public lat?: number, public lng?: number, public address?: string, public markerId?: number, public position?: any) {}
}

export class Source {
    constructor(public type?: sourceEnum, public origin?: number) {}
}

export class Lost {
    constructor(public isLost?: boolean, public reason?: string) {}
}

export enum sourceEnum {
	 Schwarm, 
	 Ableger, 
	 Gekauft,
	 Anderes
}

export enum frameSizeEnum {
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
}

export enum frameMaterialEnum {
	Holz, 
	Styropor,
	Anderes
}

export enum combConstructionEnum {
	Naturbau, 
	Mittelwaende, 
	Anderes
}