var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Treatment = (function (_super) {
    __extends(Treatment, _super);
    function Treatment(type, photos, description, date, typeOfTreatment, appliance, beginOfTreatment, endOfTreatment) {
        _super.call(this, type, photos, description, date);
        this.typeOfTreatment = typeOfTreatment;
        this.appliance = appliance;
        this.beginOfTreatment = beginOfTreatment;
        this.endOfTreatment = endOfTreatment;
    }
    Treatment.prototype.getTypeOfTreatmentEnum = function () {
        return this.getArrayOfEnum(typeOfTreatmentEnum);
    };
    return Treatment;
})(DiaryEntry);
var typeOfTreatmentEnum;
(function (typeOfTreatmentEnum) {
    typeOfTreatmentEnum[typeOfTreatmentEnum["heat"] = 0] = "heat";
    typeOfTreatmentEnum[typeOfTreatmentEnum["acid"] = 1] = "acid";
    typeOfTreatmentEnum[typeOfTreatmentEnum["other"] = 2] = "other";
})(typeOfTreatmentEnum || (typeOfTreatmentEnum = {}));
//# sourceMappingURL=Treatment.js.map