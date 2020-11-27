"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function log(constructor) {
    console.log({ constructor: constructor }, '\n');
}
function log2(target, propname) {
    console.log({ target: target });
    console.log({ propname: propname }, '\n');
}
function log3(target, propname, descriptor) {
    console.log({ target: target });
    console.log({ propname: propname });
    console.log({ descriptor: descriptor }, '\n');
}
function wrapper(options) {
    return function (constructor) {
        // here is what we want to add
    };
}
var Component = /** @class */ (function () {
    function Component(name) {
        this.name = name;
    }
    Object.defineProperty(Component.prototype, "getname", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.logname = function () {
        console.log('Component name is', this.name);
    };
    __decorate([
        log2,
        __metadata("design:type", String)
    ], Component.prototype, "name", void 0);
    __decorate([
        log3,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], Component.prototype, "getname", null);
    __decorate([
        log3,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Component.prototype, "logname", null);
    Component = __decorate([
        log,
        wrapper({
            name: 'hello',
            username: 'world'
        }),
        __metadata("design:paramtypes", [String])
    ], Component);
    return Component;
}());
var Class = /** @class */ (function () {
    function Class() {
    }
    return Class;
}());
