var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var Loss = (function (_super) {
    __extends(Loss, _super);
    function Loss(type, photos, description, date, reason) {
        _super.call(this, type, photos, description, date);
        this.reason = reason;
    }
    return Loss;
})(DiaryEntry);
exports.Loss = Loss;
//# sourceMappingURL=Loss.js.map