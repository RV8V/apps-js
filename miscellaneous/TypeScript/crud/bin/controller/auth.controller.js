"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var security_service_1 = __importDefault(require("../services/security.service"));
var AuthController = /** @class */ (function () {
    function AuthController(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.user;
    }
    AuthController.prototype.login = function (req, res) {
        var _this = this;
        var _a = req.body, password = _a.password, email = _a.email;
        this.userDataProvider.findOne(email, function (err, user) {
            if (err)
                return res.sendStatus(500);
            var flag = security_service_1.default.validatePassword(password, user.password);
            if (!user || !flag)
                return res.send({ message: 'Incorrect password', code: 400 });
            else {
                user.lastVisit = Date.now().toString();
                _this.userDataProvider.update({ _id: user._id }, user, function () {
                    console.log('user was updated');
                });
                req.session.userId = user._id;
                res.send({ message: 'Hello, welcome back' });
            }
        });
    };
    AuthController.prototype.logout = function (req, res) {
        var session = req.session;
        if (!session)
            return res.sendStatus(400);
        else
            session.destroy(function () { return res.send({ message: 'Goodbye, see you soon' }); });
    };
    AuthController.prototype.checkSession = function (req, res, next) {
        var session = req.session;
        if (~['/login', '/login'].indexOf(req.path)) {
            if (!session.userId)
                next();
            else
                res.sendStatus(406);
        }
        else {
            if (session.userId)
                next();
            else
                res.sendStatus(401);
        }
    };
    return AuthController;
}());
exports.default = AuthController;
