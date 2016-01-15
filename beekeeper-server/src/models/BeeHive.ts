export class BeeHive {
    hiveNumber: number;
    hiveName: string;
    startDate: Date;
    description: string;
    hiveLocation: HiveLocation;
    source: Source;
    lost: Lost;
    frameMaterial: frameMaterialEnum;
    combConstruction: combConstructionEnum;
    frameSize: frameSizeEnum;

    constructor(hiveNumber, hiveName, startDate, description, hiveLocation, source, lost, frameSize, frameMaterial, combConstruction) {
        this.hiveNumber = hiveNumber;
        
        this.hiveName = hiveName;
        
        this.startDate = startDate;
        
        this.description = description;
        
        this.hiveLocation = hiveLocation;
        
        this.source = source;
        
        this.lost = lost;
        
        this.frameSize = frameSize;
        
        this.frameMaterial = frameMaterial;
        
        this.combConstruction = combConstruction;
    }
    
    getSourceEnum() : string[] {
        return this.getArrayOfEnum(sourceEnum);
    }
    
    getFrameSizeEnum() : string[] {
        return this.getArrayOfEnum(frameSizeEnum);
    }
    
    getFrameMaterialEnum() : string[] {
        return this.getArrayOfEnum(frameMaterialEnum);
    }
    
    getCombConstructionEnum() : string[] {
        return this.getArrayOfEnum(combConstructionEnum);
    }
    
    private getArrayOfEnum(MyEnum) : string[] {
        var enumArray:string[];
        for(var enumMember in MyEnum) {
            enumArray.push(enumMember);
        }
        return enumArray;
    }    
}

export class HiveLocation {
	lat: number;
	long: number;
	address: string;
    markerId: number;
    
    constructor(lat, long, address, markerId) {
        this.lat = lat;
        this.long = long;
        this.address = address;
        this.markerId = markerId;
    }
}

export class Source {
	type: sourceEnum;
	origin: number;
    
    constructor(type, origin) {
        this.type = type;
        this.origin = origin;
    }
}

export class Lost {
	isLost: boolean;
	reason: string;
    
    constructor(isLost, reason) {
        this.isLost = isLost;
        this.reason = reason;
    }
}

enum sourceEnum {
	 swarm, branch, bought, other
}

enum frameSizeEnum {
	zander, deutschnormal, atbreitwabe, einheitsmas, langstrothmas, dadantoriginal,
	dadantmodifiziert, kuntzsch, schweitzermas, other
}

enum frameMaterialEnum {
	wood, styrofoam, other
}

enum combConstructionEnum {
	naturbau, mittelwaende, other
}