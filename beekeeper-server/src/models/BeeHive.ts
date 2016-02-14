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
}

export class HiveLocation {
	lat: number;
	lng: number;
	address: string;
    markerId: number;
    
    constructor(lat, lng, address, markerId) {
        this.lat = lat;
        this.lng = lng;
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

export function getSourceEnum() {
    return getArrayOfEnum(sourceEnum);
}

export function getFrameSizeEnum() {
    return getArrayOfEnum(frameSizeEnum);
}

export function getFrameMaterialEnum() {
    return getArrayOfEnum(frameMaterialEnum);
}

export function getCombConstructionEnum() {
    return getArrayOfEnum(combConstructionEnum);
}

function getArrayOfEnum(MyEnum) {
    var enumArray = new Array();
    Object.keys(MyEnum)
      .filter(v => isNaN(parseInt(v, 10)))
      .forEach(v => enumArray.push(v));
    return enumArray;
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