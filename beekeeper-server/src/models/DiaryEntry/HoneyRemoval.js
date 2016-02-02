var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var HoneyRemoval = (function (_super) {
    __extends(HoneyRemoval, _super);
    function HoneyRemoval(type, photos, description, date, isMarkdownEnabled, amount) {
        _super.call(this, type, photos, description, date, isMarkdownEnabled);
        this.amount = amount;
    }
    return HoneyRemoval;
})(DiaryEntry);
exports.HoneyRemoval = HoneyRemoval;
//# sourceMappingURL=HoneyRemoval.js.map