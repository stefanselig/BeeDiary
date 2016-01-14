var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AcarianControl = (function (_super) {
    __extends(AcarianControl, _super);
    function AcarianControl(type, photos, description, date, acariansDied, countDays) {
        _super.call(this, type, photos, description, date);
        this.countDays = countDays;
        this.acariansCaseOfDeath = acariansDied;
    }
    AcarianControl.prototype.getAcarianDeathValue = function () {
        return this.acariansCaseOfDeath / this.countDays;
    };
    return AcarianControl;
})(DiaryEntry);
//# sourceMappingURL=AcarianControl.js.map