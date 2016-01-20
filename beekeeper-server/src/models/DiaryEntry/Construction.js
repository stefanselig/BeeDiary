var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiaryEntryImport = require('./DiaryEntry');
var DiaryEntry = DiaryEntryImport.DiaryEntry;
var Construction = (function (_super) {
    __extends(Construction, _super);
    function Construction(type, photos, description, date) {
        _super.call(this, type, photos, description, date);
    }
    return Construction;
})(DiaryEntry);
exports.Construction = Construction;
//# sourceMappingURL=Construction.js.map