import mongoose = require("mongoose");

class HiveLocation {
	_lat: number;
	_long: number;
	_address: string;
	_name: string;
}

class Source {
	_type: sourceEnum;
	_value: string;
	_origin: number;
}

class Lost {
	_isLost: boolean;
	_reason: string;
}

class FrameSize {
	_type: frameSizeEnum;
	_value: string;
}

class FrameMaterial {
	_type: frameMaterialEnum;
	_value: string;
}

class CombConstruction {
	_type: combConstructionEnum;
	_value: string;
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
    _id: Number,
	_number: Number,
	_location: HiveLocation,
	_description: String,
	_source: Source,
	_startDate: Date,
	_lost: Lost,
	_frameSize: FrameSize,
	_frameMaterial: FrameMaterial,
	_combConstruction: CombConstruction
});
 
export interface IBeeHive extends mongoose.Document {
    _id: number;
	_number: number;
	_location: HiveLocation;
	_description: string;
	_source: Source;
	_startDate: Date;
	_lost: Lost;
	_frameSize: FrameSize;
	_frameMaterial: FrameMaterial;
	_combConstruction: CombConstruction;
}
 
export var beeHiveRepository = mongoose.model<IBeeHive>("BeeHiveModel");