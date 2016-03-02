"use strict";
var BeeHive = (function () {
    function BeeHive(googleID, hiveNumber, hiveName, startDate, description, photo, lastDiaryEntryDate, hiveLocation, source, lost, frameSize, otherFrameSize, frameMaterial, otherFrameMaterial, combConstruction, otherCombConstruction, trader, lastDiaryEntryId) {
        this.googleID = googleID;
        this.hiveNumber = hiveNumber;
        this.hiveName = hiveName;
        this.startDate = startDate;
        this.description = description;
        this.photo = photo;
        this.lastDiaryEntryDate = lastDiaryEntryDate;
        this.hiveLocation = hiveLocation;
        this.source = source;
        this.lost = lost;
        this.frameSize = frameSize;
        this.otherFrameSize = otherFrameSize;
        this.frameMaterial = frameMaterial;
        this.otherFrameMaterial = otherFrameMaterial;
        this.combConstruction = combConstruction;
        this.otherCombConstruction = otherCombConstruction;
        this.trader = trader;
        this.lastDiaryEntryId = lastDiaryEntryId;
    }
    return BeeHive;
}());
exports.BeeHive = BeeHive;
var HiveLocation = (function () {
    function HiveLocation(lat, lng, address, markerId, position) {
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.markerId = markerId;
        this.position = position;
    }
    return HiveLocation;
}());
exports.HiveLocation = HiveLocation;
var Source = (function () {
    function Source(type, otherSource, origin) {
        this.type = type;
        this.otherSource = otherSource;
        this.origin = origin;
    }
    return Source;
}());
exports.Source = Source;
var Lost = (function () {
    function Lost(isLost, reason) {
        this.isLost = isLost;
        this.reason = reason;
    }
    return Lost;
}());
exports.Lost = Lost;
exports.sources = ["Schwarm", "Ableger", "Gekauft", "Anderes"];
exports.frameSizes = ["Zandermaß", "Deutschnormalmaß", "Österreichische Breitwabe", "Einheitsmaß", "Langstrothmaß", "Dadant original", "Dadant modifiziert", "Kuntzsch", "Schweitzermaß", "Anderes"];
exports.frameMaterials = ["Holz", "Styropor", "Anderes"];
exports.combConstructions = ["Naturbau", "Mittelwände", "Anderes"];
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
<<<<<<< HEAD
=======
//# sourceMappingURL=BeeHive.js.map
>>>>>>> a8f7f09fe0723ac32438a31c3f7d0cb0c61805f6
