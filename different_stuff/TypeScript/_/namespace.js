var Util;
(function (Util) {
    function isEmpty(data) {
        return !data;
    }
    Util.isEmpty = isEmpty;
    function isUndefined(data) {
        return data === 'undefined';
    }
    Util.isUndefined = isUndefined;
    Util.PI = Math.PI;
    Util.EXP = Math.E;
})(Util || (Util = {}));
console.log({
    func1: Util.isEmpty,
    func2: Util.isUndefined,
    val1: Util.PI,
    val2: Util.EXP,
    val3: Math.E
});
