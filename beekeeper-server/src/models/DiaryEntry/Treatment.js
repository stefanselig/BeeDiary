var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var Treatment = (function (_super) {
    __extends(Treatment, _super);
    function Treatment(type, photos, description, date, typeOfTreatment, appliance, beginOfTreatment, endOfTreatment) {
        _super.call(this, type, photos, description, date);
        this.typeOfTreatment = typeOfTreatment;
        this.appliance = appliance;
        this.beginOfTreatment = beginOfTreatment;
        this.endOfTreatment = endOfTreatment;
    }
    return Treatment;
})(DiaryEntry);
exports.Treatment = Treatment;
function getTypeOfTreatmentEnum() {
    return getArrayOfEnum(typeOfTreatmentEnum);
}
exports.getTypeOfTreatmentEnum = getTypeOfTreatmentEnum;
function getArrayOfEnum(MyEnum) {
    var typeOfTreatmentEnumArray = new Array();
    Object.keys(MyEnum)
        .filter(function (v) { return isNaN(parseInt(v, 10)); })
        .forEach(function (v) { return typeOfTreatmentEnumArray.push(v); });
    return typeOfTreatmentEnumArray;
}
var typeOfTreatmentEnum;
(function (typeOfTreatmentEnum) {
    typeOfTreatmentEnum[typeOfTreatmentEnum["heat"] = 0] = "heat";
    typeOfTreatmentEnum[typeOfTreatmentEnum["acid"] = 1] = "acid";
    typeOfTreatmentEnum[typeOfTreatmentEnum["other"] = 2] = "other";
})(typeOfTreatmentEnum || (typeOfTreatmentEnum = {}));
//# sourceMappingURL=Treatment.js.map