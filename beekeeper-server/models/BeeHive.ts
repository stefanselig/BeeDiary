/// <reference path="../../../typings/mongoose/mongoose.maps.d.ts" />
//import mongoose = require("mongoose");

class HiveLocation {
	lat: number;
	long: number;
	address: string;
	name: string;
}

class Source {
	type: sourceEnum;
	origin: number;
}

class Lost {
	isLost: boolean;
	reason: string;
}

class FrameSize {
	type: frameSizeEnum;
}

class FrameMaterial {
	type: frameMaterialEnum;
}

class CombConstruction {
	type: combConstructionEnum;
}

enum sourceEnum {
	 swarm, branch, bought, other
};

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
 
export var beeHiveSchema = new mongoose.Schema({
    hiveNumber: Number,
	location: HiveLocation,
	description: String,
	source: Source,
	startDate: Date,
	lost: Lost,
	frameSize: FrameSize,
	frameMaterial: FrameMaterial,
	combConstruction: CombConstruction
});
 
export interface IBeeHive extends mongoose.Document {
    hiveNumber: number;
	location: HiveLocation;
	description: string;
	source: Source;
	startDate: Date;
	lost: Lost;
	frameSize: FrameSize;
	frameMaterial: FrameMaterial;
	combConstruction: CombConstruction;
}
 
export var beeHiveRepository = mongoose.model<IBeeHive>("BeeHiveModel");