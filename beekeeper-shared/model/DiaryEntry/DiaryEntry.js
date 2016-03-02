"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntry = (function () {
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
}());
exports.DiaryEntry = DiaryEntry;
var CutDroneBrood = (function (_super) {
    __extends(CutDroneBrood, _super);
    function CutDroneBrood(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
        _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
    return CutDroneBrood;
}(DiaryEntry));
exports.CutDroneBrood = CutDroneBrood;
var HoneyRemoval = (function (_super) {
    __extends(HoneyRemoval, _super);
    function HoneyRemoval(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, amount) {
        _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.amount = amount;
    }
    return HoneyRemoval;
}(DiaryEntry));
exports.HoneyRemoval = HoneyRemoval;
var AcarianControl = (function (_super) {
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
}(DiaryEntry));
exports.AcarianControl = AcarianControl;
var Construction = (function (_super) {
    __extends(Construction, _super);
    function Construction(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName) {
        _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
    }
    return Construction;
}(DiaryEntry));
exports.Construction = Construction;
var Feeding = (function (_super) {
    __extends(Feeding, _super);
    function Feeding(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, foodType, otherFood, amount, proportion) {
        _super.call(this, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.foodType = foodType;
        this.otherFood = otherFood;
        this.amount = amount;
        this.proportion = proportion;
    }
    return Feeding;
}(DiaryEntry));
exports.Feeding = Feeding;
var Treatment = (function (_super) {
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
}(DiaryEntry));
exports.Treatment = Treatment;
var Loss = (function (_super) {
    __extends(Loss, _super);
    function Loss(mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName, reason) {
        _super.call(this, mood, type, otherType, photos, description, date, isMarkdownEnabled, beeHiveId, beeHiveName);
        this.reason = reason;
    }
    return Loss;
}(DiaryEntry));
exports.Loss = Loss;
var Photo = (function () {
    function Photo(id, content) {
        this.id = id;
        this.content = content;
    }
    return Photo;
}());
exports.Photo = Photo;
exports.treatmentTypes = ["Hitze", "Säure", "Anderes"];
exports.foodTypes = ["Zucker", "Anderes"];
exports.entryTypes = ["Milbenkontrolle", "Errichtung", "Behandlung", "Fütterung", "Honigentnahme", "Verlust", "Drohnenbrutausschnitt", "Anderes"];
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
<<<<<<< HEAD
=======
//# sourceMappingURL=DiaryEntry.js.map
>>>>>>> a8f7f09fe0723ac32438a31c3f7d0cb0c61805f6
