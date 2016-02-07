var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var CutDroneBrood = (function (_super) {
    __extends(CutDroneBrood, _super);
    function CutDroneBrood(type, photos, description, date, isMarkdownEnabled, beeHiveName) {
        _super.call(this, type, photos, description, date, isMarkdownEnabled, beeHiveName);
    }
    return CutDroneBrood;
})(DiaryEntry);
exports.CutDroneBrood = CutDroneBrood;
//# sourceMappingURL=CutDroneBrood.js.map