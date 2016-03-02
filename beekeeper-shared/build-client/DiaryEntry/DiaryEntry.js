System.register([], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var DiaryEntry, CutDroneBrood, HoneyRemoval, AcarianControl, Construction, Feeding, Treatment, Loss, Photo, treatmentTypes, foodTypes, entryTypes;
    return {
        setters:[],
        execute: function() {
            DiaryEntry = (function () {
                function DiaryEntry(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
                    this.mood = mood;
                    this.type = type;
                    this.otherType = otherType;
                    this.photos = photos;
                    this.description = description;
                    this.date = date;
                    this.isMarkdownEnabled = isMarkdownEnabled;
                    this.beeHiveId = beeHiveId;
                    this.beeHiveName = beeHiveName;
                }
                return DiaryEntry;
            })();
            exports_1("DiaryEntry", DiaryEntry);
            CutDroneBrood = (function (_super) {
                __extends(CutDroneBrood, _super);
                function CutDroneBrood(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
                    _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                }
                return CutDroneBrood;
            })(DiaryEntry);
            exports_1("CutDroneBrood", CutDroneBrood);
            HoneyRemoval = (function (_super) {
                __extends(HoneyRemoval, _super);
                function HoneyRemoval(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, amount) {
                    _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                    this.amount = amount;
                }
                return HoneyRemoval;
            })(DiaryEntry);
            exports_1("HoneyRemoval", HoneyRemoval);
            AcarianControl = (function (_super) {
                __extends(AcarianControl, _super);
                function AcarianControl(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, deadAcarians, countDays) {
                    _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                    this.deadAcarians = deadAcarians;
                    this.countDays = countDays;
                    this.acarianDeathValue = this.getAcarianDeathValue();
                }
                AcarianControl.prototype.getAcarianDeathValue = function () {
                    return this.deadAcarians / this.countDays;
                };
                return AcarianControl;
            })(DiaryEntry);
            exports_1("AcarianControl", AcarianControl);
            Construction = (function (_super) {
                __extends(Construction, _super);
                function Construction(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
                    _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                }
                return Construction;
            })(DiaryEntry);
            exports_1("Construction", Construction);
            Feeding = (function (_super) {
                __extends(Feeding, _super);
                function Feeding(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, foodType, otherFood, amount, proportion) {
                    _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                    this.foodType = foodType;
                    this.otherFood = otherFood;
                    this.amount = amount;
                    this.proportion = proportion;
                }
                return Feeding;
            })(DiaryEntry);
            exports_1("Feeding", Feeding);
            Treatment = (function (_super) {
                __extends(Treatment, _super);
                function Treatment(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, treatmentType, otherTreatment, appliance, treatmentBegin, treatmentEnd) {
                    _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                    this.treatmentType = treatmentType;
                    this.otherTreatment = otherTreatment;
                    this.appliance = appliance;
                    this.treatmentBegin = treatmentBegin;
                    this.treatmentEnd = treatmentEnd;
                }
                return Treatment;
            })(DiaryEntry);
            exports_1("Treatment", Treatment);
            Loss = (function (_super) {
                __extends(Loss, _super);
                function Loss(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, reason) {
                    _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
                    this.reason = reason;
                }
                return Loss;
            })(DiaryEntry);
            exports_1("Loss", Loss);
            Photo = (function () {
                function Photo(id, content) {
                    this.id = id;
                    this.content = content;
                }
                return Photo;
            })();
            exports_1("Photo", Photo);
            exports_1("treatmentTypes", treatmentTypes = ["Hitze", "Säure", "Anderes"]);
            exports_1("foodTypes", foodTypes = ["Zucker", "Anderes"]);
            exports_1("entryTypes", entryTypes = ["Milbenkontrolle", "Errichtung", "Behandlung", "Fütterung", "Honigentnahme", "Verlust", "Drohnenbrutausschnitt", "Anderes"]);
        }
    }
});
/*
export enum treatmentTypeEnum {
    Hitze,
    Säure,
    Anderes
}

export enum foodTypeEnum {
    Zucker,
    Anderes
}

export enum entryTypeEnum {
    Milbenkontrolle,
    Errichtung,
    Behandlung,
    Fuetterung,
    Honigentnahme,
    Verlust,
    Drohnenbrutausschnitt,
    Anderes
}
*/ 
