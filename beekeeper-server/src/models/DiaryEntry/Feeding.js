var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var Feeding = (function (_super) {
    __extends(Feeding, _super);
    function Feeding(type, photos, description, date, typeOfFood, amount, proportion) {
        _super.call(this, type, photos, description, date);
        this.typeOfFood = typeOfFood;
        this.amount = amount;
        this.proportion = proportion;
    }
    return Feeding;
})(DiaryEntry);
exports.Feeding = Feeding;
function getTypeOfFoodEnum() {
    return getArrayOfEnum(typeOfFoodEnum);
}
exports.getTypeOfFoodEnum = getTypeOfFoodEnum;
function getArrayOfEnum(MyEnum) {
    var typeOfFoodEnumArray = new Array();
    Object.keys(MyEnum)
        .filter(function (v) { return isNaN(parseInt(v, 10)); })
        .forEach(function (v) { return typeOfFoodEnumArray.push(v); });
    return typeOfFoodEnumArray;
}
var typeOfFoodEnum;
(function (typeOfFoodEnum) {
    typeOfFoodEnum[typeOfFoodEnum["sugar"] = 0] = "sugar";
    typeOfFoodEnum[typeOfFoodEnum["other"] = 1] = "other";
})(typeOfFoodEnum || (typeOfFoodEnum = {}));
//# sourceMappingURL=Feeding.js.map