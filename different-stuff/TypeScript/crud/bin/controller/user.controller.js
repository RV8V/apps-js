"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_entity_1 = __importDefault(require("../entity/user.entity"));
var security_service_1 = __importDefault(require("../services/security.service"));
var UserController = /** @class */ (function () {
    function UserController(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.user;
    }
    UserController.prototype.findAll = function (onLoad) {
        this.userDataProvider.select({}, onLoad);
    };
    UserController.prototype.findByEmail = function (email, onLoad, onError) {
        this.userDataProvider.findOne(email, function (err, data) {
            if (err)
                onError(err.message, 500);
            else {
                var result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    };
    UserController.prototype.createUser = function (data, onCreate, onError) {
        var _this = this;
        var emailPattern = /^[a-z0-9_-]{4,}\@[-a-a0-9]{3,}\.[a-z]{2,3}$/;
        if (!emailPattern.test(data.email) || !data.password.length)
            onError('Incorrect password or email', 400);
        else {
            this.findByEmail(data.email, function (result) {
                if (!result) {
                    var user = new user_entity_1.default();
                    user.name = data.name;
                    user.email = data.email;
                    user.password = security_service_1.default.generatePasswordHash(data.password);
                    _this.userDataProvider.create(user, function (err, newData) {
                        if (err)
                            onError(err.message, 500);
                        else
                            onCreate(newData);
                    });
                }
                else
                    onError('User already exists', 400);
            }, onError);
        }
    };
    UserController.prototype.removeById = function (id, onRemove) {
        this.userDataProvider.delete({ _id: id }, onRemove);
    };
    UserController.prototype.updateById = function (id, newData, onUpdata) {
        this.userDataProvider.update(id, newData, onUpdata);
    };
    return UserController;
}());
exports.default = UserController;
