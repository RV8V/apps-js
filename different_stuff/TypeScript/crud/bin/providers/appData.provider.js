"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_provider_1 = __importDefault(require("./user.provider"));
var ApplicationDataProvider = /** @class */ (function () {
    function ApplicationDataProvider() {
        this.storage = this.getProviders().map(function (provider) { return new provider(); });
    }
    ApplicationDataProvider.prototype.getInstanceProvider = function (type) {
        var items = this.storage.filter(function (provider) {
            if (provider instanceof type)
                return provider;
        });
        return items.length > 0 ? items[0] : null;
    };
    Object.defineProperty(ApplicationDataProvider.prototype, "user", {
        get: function () {
            return this.getInstanceProvider(user_provider_1.default);
        },
        enumerable: false,
        configurable: true
    });
    ApplicationDataProvider.prototype.getProviders = function () {
        return [user_provider_1.default];
    };
    return ApplicationDataProvider;
}());
exports.default = ApplicationDataProvider;
