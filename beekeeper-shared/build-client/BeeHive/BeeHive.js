System.register([], function(exports_1) {
    var BeeHive, HiveLocation, Source, Lost, sources, frameSizes, frameMaterials, combConstructions;
    return {
        setters:[],
        execute: function() {
            BeeHive = (function () {
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
            exports_1("sources", sources = ["Schwarm", "Ableger", "Gekauft", "Anderes"]);
            exports_1("frameSizes", frameSizes = ["Zandermaß", "Deutschnormalmaß", "Österreichische Breitwabe", "Einheitsmaß", "Langstrothmaß", "Dadant original", "Dadant modifiziert", "Kuntzsch", "Schweitzermaß", "Anderes"]);
            exports_1("frameMaterials", frameMaterials = ["Holz", "Styropor", "Anderes"]);
            exports_1("combConstructions", combConstructions = ["Naturbau", "Mittelwände", "Anderes"]);
        }
    }
});
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
