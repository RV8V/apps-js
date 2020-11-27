"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
        var date = Date.now().toString();
        this.created = date;
        this.lastVisit = date;
    }
    return User;
}());
exports.default = User;
