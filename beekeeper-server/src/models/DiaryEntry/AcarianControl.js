var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var AcarianControl = (function (_super) {
    __extends(AcarianControl, _super);
    function AcarianControl(type, photos, description, date, deadAcarians, countDays) {
        _super.call(this, type, photos, description, date);
        this.countDays = countDays;
        this.deadAcarians = deadAcarians;
    }
    AcarianControl.prototype.getAcarianDeathValue = function () {
        return this.deadAcarians / this.countDays;
    };
    return AcarianControl;
})(DiaryEntry);
exports.AcarianControl = AcarianControl;
//# sourceMappingURL=AcarianControl.js.map