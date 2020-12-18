"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_provider_1 = __importDefault(require("./data.provider"));
var UserDataProvider = /** @class */ (function (_super) {
    __extends(UserDataProvider, _super);
    function UserDataProvider() {
        return _super.call(this, 'User') || this;
    }
    UserDataProvider.prototype.select = function (where, onSelect) {
        this.dbStore.find(where, onSelect);
    };
    UserDataProvider.prototype.findOne = function (where, onSelect) {
        this.dbStore.findOne(where, onSelect);
    };
    UserDataProvider.prototype.create = function (data, onCreate) {
        this.dbStore.insert(data, onCreate);
    };
    UserDataProvider.prototype.update = function (where, newData, onUpdata) {
        this.dbStore.update(where, { $set: newData });
    };
    UserDataProvider.prototype.delete = function (where, onDelete) {
        this.dbStore.remove(where, { multi: true }, onDelete);
    };
    UserDataProvider.prototype.onLoadStore = function (err) {
        if (err)
            console.log(err);
    };
    return UserDataProvider;
}(data_provider_1.default));
exports.default = UserDataProvider;
