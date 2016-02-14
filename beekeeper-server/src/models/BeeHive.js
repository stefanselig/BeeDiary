var BeeHive = (function () {
    function BeeHive(hiveNumber, hiveName, startDate, description, hiveLocation, source, lost, frameSize, frameMaterial, combConstruction) {
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
    return BeeHive;
})();
exports.BeeHive = BeeHive;
var HiveLocation = (function () {
    function HiveLocation(lat, lng, address, markerId) {
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.markerId = markerId;
    }
    return HiveLocation;
})();
exports.HiveLocation = HiveLocation;
var Source = (function () {
    function Source(type, origin) {
        this.type = type;
        this.origin = origin;
    }
    return Source;
})();
exports.Source = Source;
var Lost = (function () {
    function Lost(isLost, reason) {
        this.isLost = isLost;
        this.reason = reason;
    }
    return Lost;
})();
exports.Lost = Lost;
function getSourceEnum() {
    return getArrayOfEnum(sourceEnum);
}
exports.getSourceEnum = getSourceEnum;
function getFrameSizeEnum() {
    return getArrayOfEnum(frameSizeEnum);
}
exports.getFrameSizeEnum = getFrameSizeEnum;
function getFrameMaterialEnum() {
    return getArrayOfEnum(frameMaterialEnum);
}
exports.getFrameMaterialEnum = getFrameMaterialEnum;
function getCombConstructionEnum() {
    return getArrayOfEnum(combConstructionEnum);
}
exports.getCombConstructionEnum = getCombConstructionEnum;
function getArrayOfEnum(MyEnum) {
    var enumArray = new Array();
    Object.keys(MyEnum)
        .filter(function (v) { return isNaN(parseInt(v, 10)); })
        .forEach(function (v) { return enumArray.push(v); });
    return enumArray;
}
var sourceEnum;
(function (sourceEnum) {
    sourceEnum[sourceEnum["swarm"] = 0] = "swarm";
    sourceEnum[sourceEnum["branch"] = 1] = "branch";
    sourceEnum[sourceEnum["bought"] = 2] = "bought";
    sourceEnum[sourceEnum["other"] = 3] = "other";
})(sourceEnum || (sourceEnum = {}));
var frameSizeEnum;
(function (frameSizeEnum) {
    frameSizeEnum[frameSizeEnum["zander"] = 0] = "zander";
    frameSizeEnum[frameSizeEnum["deutschnormal"] = 1] = "deutschnormal";
    frameSizeEnum[frameSizeEnum["atbreitwabe"] = 2] = "atbreitwabe";
    frameSizeEnum[frameSizeEnum["einheitsmas"] = 3] = "einheitsmas";
    frameSizeEnum[frameSizeEnum["langstrothmas"] = 4] = "langstrothmas";
    frameSizeEnum[frameSizeEnum["dadantoriginal"] = 5] = "dadantoriginal";
    frameSizeEnum[frameSizeEnum["dadantmodifiziert"] = 6] = "dadantmodifiziert";
    frameSizeEnum[frameSizeEnum["kuntzsch"] = 7] = "kuntzsch";
    frameSizeEnum[frameSizeEnum["schweitzermas"] = 8] = "schweitzermas";
    frameSizeEnum[frameSizeEnum["other"] = 9] = "other";
})(frameSizeEnum || (frameSizeEnum = {}));
var frameMaterialEnum;
(function (frameMaterialEnum) {
    frameMaterialEnum[frameMaterialEnum["wood"] = 0] = "wood";
    frameMaterialEnum[frameMaterialEnum["styrofoam"] = 1] = "styrofoam";
    frameMaterialEnum[frameMaterialEnum["other"] = 2] = "other";
})(frameMaterialEnum || (frameMaterialEnum = {}));
var combConstructionEnum;
(function (combConstructionEnum) {
    combConstructionEnum[combConstructionEnum["naturbau"] = 0] = "naturbau";
    combConstructionEnum[combConstructionEnum["mittelwaende"] = 1] = "mittelwaende";
    combConstructionEnum[combConstructionEnum["other"] = 2] = "other";
})(combConstructionEnum || (combConstructionEnum = {}));
//# sourceMappingURL=BeeHive.js.map