var DiaryEntry = (function () {
    function DiaryEntry(type, photos, description, date) {
        this.type = type;
        this.date = date;
        this.description = description;
        this.photos = photos;
    }
    return DiaryEntry;
})();
exports.DiaryEntry = DiaryEntry;
function getEntryTypeEnum() {
    return getArrayOfEnum(entryTypeEnum);
}
exports.getEntryTypeEnum = getEntryTypeEnum;
function getArrayOfEnum(MyEnum) {
    var entryTypeEnumArray = new Array();
    Object.keys(MyEnum)
        .filter(function (v) { return isNaN(parseInt(v, 10)); })
        .forEach(function (v) { return entryTypeEnumArray.push(v); });
    return entryTypeEnumArray;
}
var entryTypeEnum;
(function (entryTypeEnum) {
    entryTypeEnum[entryTypeEnum["acarianControl"] = 0] = "acarianControl";
    entryTypeEnum[entryTypeEnum["construction"] = 1] = "construction";
    entryTypeEnum[entryTypeEnum["treatment"] = 2] = "treatment";
    entryTypeEnum[entryTypeEnum["feeding"] = 3] = "feeding";
    entryTypeEnum[entryTypeEnum["honeyRemoval"] = 4] = "honeyRemoval";
    entryTypeEnum[entryTypeEnum["loss"] = 5] = "loss";
    entryTypeEnum[entryTypeEnum["cutDroneBrood"] = 6] = "cutDroneBrood";
    entryTypeEnum[entryTypeEnum["other"] = 7] = "other";
})(entryTypeEnum || (entryTypeEnum = {}));
var Photo = (function () {
    function Photo() {
    }
    return Photo;
})();
exports.Photo = Photo;
//# sourceMappingURL=DiaryEntry.js.map