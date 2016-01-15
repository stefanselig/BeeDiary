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
    BeeHive.prototype.getSourceEnum = function () {
        return this.getArrayOfEnum(sourceEnum);
    };
    BeeHive.prototype.getFrameSizeEnum = function () {
        return this.getArrayOfEnum(frameSizeEnum);
    };
    BeeHive.prototype.getFrameMaterialEnum = function () {
        return this.getArrayOfEnum(frameMaterialEnum);
    };
    BeeHive.prototype.getCombConstructionEnum = function () {
        return this.getArrayOfEnum(combConstructionEnum);
    };
    BeeHive.prototype.getArrayOfEnum = function (MyEnum) {
        var enumArray;
        for (var enumMember in MyEnum) {
            enumArray.push(enumMember);
        }
        return enumArray;
    };
    return BeeHive;
})();
exports.BeeHive = BeeHive;
var HiveLocation = (function () {
    function HiveLocation(lat, long, address, markerId) {
        this.lat = lat;
        this.long = long;
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