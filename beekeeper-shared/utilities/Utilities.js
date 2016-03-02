"use strict";
function getArrayOfEnum(myEnum) {
    var enumArray = [];
    Object.keys(myEnum)
        .filter(function (v) { return isNaN(parseInt(v, 10)); })
        .forEach(function (v) { return enumArray.push(v); });
    return enumArray;
}
exports.getArrayOfEnum = getArrayOfEnum;
//# sourceMappingURL=Utilities.js.map