System.register([], function(exports_1) {
    function getArrayOfEnum(myEnum) {
        var enumArray = [];
        Object.keys(myEnum)
            .filter(function (v) { return isNaN(parseInt(v, 10)); })
            .forEach(function (v) { return enumArray.push(v); });
        return enumArray;
    }
    exports_1("getArrayOfEnum", getArrayOfEnum);
    return {
        setters:[],
        execute: function() {
        }
    }
});
