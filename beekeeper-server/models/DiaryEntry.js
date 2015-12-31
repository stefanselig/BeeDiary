System.register([], function(exports_1) {
    var DiaryEntry, Type, typeEnum, AcarianControl, Construction, Treamtent, Feeding, HoneyRemoval, Loss, CutDroneBrood, Other, Photo;
    return {
        setters:[],
        execute: function() {
            DiaryEntry = (function () {
                function DiaryEntry() {
                }
                return DiaryEntry;
            })();
            exports_1("DiaryEntry", DiaryEntry);
            Type = (function () {
                function Type() {
                }
                return Type;
            })();
            (function (typeEnum) {
                typeEnum[typeEnum["acarianControl"] = 0] = "acarianControl";
                typeEnum[typeEnum["construction"] = 1] = "construction";
                typeEnum[typeEnum["treatment"] = 2] = "treatment";
                typeEnum[typeEnum["feeding"] = 3] = "feeding";
                typeEnum[typeEnum["honeyRemoval"] = 4] = "honeyRemoval";
                typeEnum[typeEnum["loss"] = 5] = "loss";
                typeEnum[typeEnum["cutDroneBrood"] = 6] = "cutDroneBrood";
                typeEnum[typeEnum["other"] = 7] = "other";
            })(typeEnum || (typeEnum = {}));
            AcarianControl = (function () {
                function AcarianControl() {
                }
                AcarianControl.prototype.getAcarianDeathValue = function () {
                    return this._countDays / this._acariansCaseOfDeath;
                };
                return AcarianControl;
            })();
            Construction = (function () {
                function Construction() {
                }
                return Construction;
            })();
            Treamtent = (function () {
                function Treamtent() {
                }
                return Treamtent;
            })();
            Feeding = (function () {
                function Feeding() {
                }
                return Feeding;
            })();
            HoneyRemoval = (function () {
                function HoneyRemoval() {
                }
                return HoneyRemoval;
            })();
            Loss = (function () {
                function Loss() {
                }
                return Loss;
            })();
            CutDroneBrood = (function () {
                function CutDroneBrood() {
                }
                return CutDroneBrood;
            })();
            Other = (function () {
                function Other() {
                }
                return Other;
            })();
            Photo = (function () {
                function Photo() {
                }
                return Photo;
            })();
        }
    }
});
//# sourceMappingURL=DiaryEntry.js.map