var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntry = (function () {
    function DiaryEntry(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
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
exports.DiaryEntry = DiaryEntry;
var CutDroneBrood = (function (_super) {
    __extends(CutDroneBrood, _super);
    function CutDroneBrood(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
    return CutDroneBrood;
})(DiaryEntry);
exports.CutDroneBrood = CutDroneBrood;
var HoneyRemoval = (function (_super) {
    __extends(HoneyRemoval, _super);
    function HoneyRemoval(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, amount) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.amount = amount;
    }
    return HoneyRemoval;
})(DiaryEntry);
exports.HoneyRemoval = HoneyRemoval;
var AcarianControl = (function (_super) {
    __extends(AcarianControl, _super);
    function AcarianControl(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, deadAcarians, countDays) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.deadAcarians = deadAcarians;
        this.countDays = countDays;
        this.acarianDeathValue = this.getAcarianDeathValue();
    }
    AcarianControl.prototype.getAcarianDeathValue = function () {
        return this.deadAcarians / this.countDays;
    };
    return AcarianControl;
})(DiaryEntry);
exports.AcarianControl = AcarianControl;
var Construction = (function (_super) {
    __extends(Construction, _super);
    function Construction(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
    return Construction;
})(DiaryEntry);
exports.Construction = Construction;
var Feeding = (function (_super) {
    __extends(Feeding, _super);
    function Feeding(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, foodType, otherFood, amount, proportion) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.foodType = foodType;
        this.otherFood = otherFood;
        this.amount = amount;
        this.proportion = proportion;
    }
    return Feeding;
})(DiaryEntry);
exports.Feeding = Feeding;
var Treatment = (function (_super) {
    __extends(Treatment, _super);
    function Treatment(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, treatmentType, otherTreatment, appliance, treatmentBegin, treatmentEnd) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.treatmentType = treatmentType;
        this.otherTreatment = otherTreatment;
        this.appliance = appliance;
        this.treatmentBegin = treatmentBegin;
        this.treatmentEnd = treatmentEnd;
    }
    return Treatment;
})(DiaryEntry);
exports.Treatment = Treatment;
var Loss = (function (_super) {
    __extends(Loss, _super);
    function Loss(type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, reason) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.reason = reason;
    }
    return Loss;
})(DiaryEntry);
exports.Loss = Loss;
var Photo = (function () {
    function Photo(id, content) {
        this.id = id;
        this.content = content;
    }
    return Photo;
})();
exports.Photo = Photo;
(function (treatmentTypeEnum) {
    treatmentTypeEnum[treatmentTypeEnum["Hitze"] = 0] = "Hitze";
    treatmentTypeEnum[treatmentTypeEnum["Säure"] = 1] = "Säure";
    treatmentTypeEnum[treatmentTypeEnum["Anderes"] = 2] = "Anderes";
})(exports.treatmentTypeEnum || (exports.treatmentTypeEnum = {}));
var treatmentTypeEnum = exports.treatmentTypeEnum;
(function (foodTypeEnum) {
    foodTypeEnum[foodTypeEnum["Zucker"] = 0] = "Zucker";
    foodTypeEnum[foodTypeEnum["Anderes"] = 1] = "Anderes";
})(exports.foodTypeEnum || (exports.foodTypeEnum = {}));
var foodTypeEnum = exports.foodTypeEnum;
(function (entryTypeEnum) {
    entryTypeEnum[entryTypeEnum["Milbenkontrolle"] = 0] = "Milbenkontrolle";
    entryTypeEnum[entryTypeEnum["Errichtung"] = 1] = "Errichtung";
    entryTypeEnum[entryTypeEnum["Behandlung"] = 2] = "Behandlung";
    entryTypeEnum[entryTypeEnum["Fuetterung"] = 3] = "Fuetterung";
    entryTypeEnum[entryTypeEnum["Honigentnahme"] = 4] = "Honigentnahme";
    entryTypeEnum[entryTypeEnum["Verlust"] = 5] = "Verlust";
    entryTypeEnum[entryTypeEnum["Drohnenbrutausschnitt"] = 6] = "Drohnenbrutausschnitt";
    entryTypeEnum[entryTypeEnum["Anderes"] = 7] = "Anderes";
})(exports.entryTypeEnum || (exports.entryTypeEnum = {}));
var entryTypeEnum = exports.entryTypeEnum;
//# sourceMappingURL=DiaryEntry.js.map