var DiaryEntry = (function () {
    function DiaryEntry(type, photos, description, date) {
        this.type = type;
        this.date = date;
        this.description = description;
        this.photos = photos;
    }
    DiaryEntry.prototype.getEntryTypeEnum = function () {
        return this.getArrayOfEnum(entryTypeEnum);
    };
    DiaryEntry.prototype.getArrayOfEnum = function (MyEnum) {
        var enumArray;
        for (var enumMember in MyEnum) {
            enumArray.push(enumMember);
        }
        return enumArray;
    };
    return DiaryEntry;
})();
exports.DiaryEntry = DiaryEntry;
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