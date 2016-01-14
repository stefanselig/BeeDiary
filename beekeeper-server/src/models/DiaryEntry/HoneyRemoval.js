var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HoneyRemoval = (function (_super) {
    __extends(HoneyRemoval, _super);
    function HoneyRemoval(type, photos, description, date, amount) {
        _super.call(this, type, photos, description, date);
        this.amount = amount;
    }
    return HoneyRemoval;
})(DiaryEntry);
//# sourceMappingURL=HoneyRemoval.js.map