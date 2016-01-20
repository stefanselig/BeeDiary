var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var Treatment = (function (_super) {
    __extends(Treatment, _super);
    function Treatment(type, photos, description, date, treatmentType, appliance, treatmentBegin, treatmentEnd) {
        _super.call(this, type, photos, description, date);
        this.treatmentType = treatmentType;
        this.appliance = appliance;
        this.treatmentBegin = treatmentBegin;
        this.treatmentEnd = treatmentEnd;
    }
    return Treatment;
})(DiaryEntry);
exports.Treatment = Treatment;
function getTreatmentTypeEnum() {
    return getArrayOfEnum(treatmentTypeEnum);
}
exports.getTreatmentTypeEnum = getTreatmentTypeEnum;
function getArrayOfEnum(MyEnum) {
    var typeOfTreatmentEnumArray = new Array();
    Object.keys(MyEnum)
        .filter(function (v) { return isNaN(parseInt(v, 10)); })
        .forEach(function (v) { return typeOfTreatmentEnumArray.push(v); });
    return typeOfTreatmentEnumArray;
}
var treatmentTypeEnum;
(function (treatmentTypeEnum) {
    treatmentTypeEnum[treatmentTypeEnum["heat"] = 0] = "heat";
    treatmentTypeEnum[treatmentTypeEnum["acid"] = 1] = "acid";
    treatmentTypeEnum[treatmentTypeEnum["other"] = 2] = "other";
})(treatmentTypeEnum || (treatmentTypeEnum = {}));
//# sourceMappingURL=Treatment.js.map