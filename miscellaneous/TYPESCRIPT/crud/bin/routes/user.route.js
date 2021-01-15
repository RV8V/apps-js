"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = __importDefault(require("../controller/auth.controller"));
var user_controller_1 = __importDefault(require("../controller/user.controller"));
var app_1 = __importDefault(require("../app"));
var UserRoute = {
    createRoute: function (router) {
        var app = app_1.default.getInstance();
        var AuthCont = new auth_controller_1.default(app);
        var UserCont = new user_controller_1.default(app);
        return router()
            .use(AuthCont.checkSession)
            .get('/', function (req, res) {
            UserCont.findAll(function (err, data) { return res.send({ user: data }); });
        })
            .post('/add', function (req, res) {
            if (!req.body)
                res.send({ message: 'Empty body request', code: 400 });
            else {
                UserCont.createUser(req.body, function (newData) { return res.send({ userCreated: newData }); }, function (message, code) { return res.send({ message: message, code: code }); });
            }
        })
            .post('/login', function (req, res) {
            if (!req.body)
                res.send({ message: 'Empty body request', code: 400 });
            else
                AuthCont.login(req, res);
        })
            .get('/logout', AuthCont.logout);
    }
};
exports.default = UserRoute;
