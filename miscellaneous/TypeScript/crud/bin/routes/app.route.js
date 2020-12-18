"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_route_1 = __importDefault(require("./user.route"));
var express_1 = require("express");
var AppRoutes = /** @class */ (function () {
    function AppRoutes() {
        this.routeList = [
            { path: '/user', router: user_route_1.default }
        ];
    }
    AppRoutes.prototype.mount = function (expApp) {
        this.routeList.forEach(function (item) {
            expApp.use(item.path, item.router.createRoute(express_1.Router));
        });
    };
    return AppRoutes;
}());
exports.default = AppRoutes;
