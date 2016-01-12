class BeeHive {
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
        
        this.hiveLocation.lat = hiveLocation.lat;
        this.hiveLocation.long = hiveLocation.long;
        this.hiveLocation.address = hiveLocation.address;
        this.hiveLocation.markerId = hiveLocation.markerId;
        
        this.source.type = source.type;
        this.source.origin = source.origin;
        
        this.lost.isLost = lost.isLost;
        this.lost.reason = lost.reason;
        
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

class HiveLocation {
	lat: number;
	long: number;
	address: string;
    markerId: number;
}

class Source {
	type: sourceEnum;
	origin: number;
}

class Lost {
	isLost: boolean;
	reason: string;
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