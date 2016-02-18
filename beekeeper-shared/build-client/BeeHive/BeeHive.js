System.register([], function(exports_1) {
    var BeeHive, HiveLocation, Source, Lost, sourceEnum, frameSizeEnum, frameMaterialEnum, combConstructionEnum;
    return {
        setters:[],
        execute: function() {
            BeeHive = (function () {
                function BeeHive(hiveNumber, hiveName, startDate, description, photo, lastDiaryEntryDate, hiveLocation, source, lost, frameSize, otherFrameSize, frameMaterial, otherFrameMaterial, combConstruction, otherCombConstruction, trader, lastDiaryEntryId) {
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
            })();
            exports_1("BeeHive", BeeHive);
            HiveLocation = (function () {
                function HiveLocation(lat, lng, address, markerId, position) {
                    this.lat = lat;
                    this.lng = lng;
                    this.address = address;
                    this.markerId = markerId;
                    this.position = position;
                }
                return HiveLocation;
            })();
            exports_1("HiveLocation", HiveLocation);
            Source = (function () {
                function Source(type, otherSource, origin) {
                    this.type = type;
                    this.otherSource = otherSource;
                    this.origin = origin;
                }
                return Source;
            })();
            exports_1("Source", Source);
            Lost = (function () {
                function Lost(isLost, reason) {
                    this.isLost = isLost;
                    this.reason = reason;
                }
                return Lost;
            })();
            exports_1("Lost", Lost);
            (function (sourceEnum) {
                sourceEnum[sourceEnum["Schwarm"] = 0] = "Schwarm";
                sourceEnum[sourceEnum["Ableger"] = 1] = "Ableger";
                sourceEnum[sourceEnum["Gekauft"] = 2] = "Gekauft";
                sourceEnum[sourceEnum["Anderes"] = 3] = "Anderes";
            })(sourceEnum || (sourceEnum = {}));
            exports_1("sourceEnum", sourceEnum);
            (function (frameSizeEnum) {
                frameSizeEnum[frameSizeEnum["Zander"] = 0] = "Zander";
                frameSizeEnum[frameSizeEnum["Deutschnormal"] = 1] = "Deutschnormal";
                frameSizeEnum[frameSizeEnum["Atbreitwabe"] = 2] = "Atbreitwabe";
                frameSizeEnum[frameSizeEnum["Einheitsmas"] = 3] = "Einheitsmas";
                frameSizeEnum[frameSizeEnum["Langstrothmas"] = 4] = "Langstrothmas";
                frameSizeEnum[frameSizeEnum["Dadantoriginal"] = 5] = "Dadantoriginal";
                frameSizeEnum[frameSizeEnum["Dadantmodifiziert"] = 6] = "Dadantmodifiziert";
                frameSizeEnum[frameSizeEnum["Kuntzsch"] = 7] = "Kuntzsch";
                frameSizeEnum[frameSizeEnum["Schweitzermas"] = 8] = "Schweitzermas";
                frameSizeEnum[frameSizeEnum["Anderes"] = 9] = "Anderes";
            })(frameSizeEnum || (frameSizeEnum = {}));
            exports_1("frameSizeEnum", frameSizeEnum);
            (function (frameMaterialEnum) {
                frameMaterialEnum[frameMaterialEnum["Holz"] = 0] = "Holz";
                frameMaterialEnum[frameMaterialEnum["Styropor"] = 1] = "Styropor";
                frameMaterialEnum[frameMaterialEnum["Anderes"] = 2] = "Anderes";
            })(frameMaterialEnum || (frameMaterialEnum = {}));
            exports_1("frameMaterialEnum", frameMaterialEnum);
            (function (combConstructionEnum) {
                combConstructionEnum[combConstructionEnum["Naturbau"] = 0] = "Naturbau";
                combConstructionEnum[combConstructionEnum["Mittelwaende"] = 1] = "Mittelwaende";
                combConstructionEnum[combConstructionEnum["Anderes"] = 2] = "Anderes";
            })(combConstructionEnum || (combConstructionEnum = {}));
            exports_1("combConstructionEnum", combConstructionEnum);
        }
    }
});
