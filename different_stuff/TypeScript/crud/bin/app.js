"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appData_provider_1 = __importDefault(require("./providers/appData.provider"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var body_parser_1 = __importDefault(require("body-parser"));
var app_route_1 = __importDefault(require("./routes/app.route"));
var App = /** @class */ (function () {
    function App(config) {
        this.config = config;
        this.expApp = express_1.default();
        App.app = this;
    }
    App.getInstance = function () {
        return App.app;
    };
    Object.defineProperty(App.prototype, "providers", {
        get: function () {
            return this.dataProviders;
        },
        enumerable: false,
        configurable: true
    });
    App.prototype.run = function () {
        var _this = this;
        this.expApp.use(express_session_1.default({
            resave: false,
            saveUninitialized: false,
            secret: 'secret',
            cookie: { maxAge: 3600000 }
        }));
        this.expApp.use(body_parser_1.default.urlencoded({ extended: false }));
        this.expApp.use(function (req, res, next) {
            res.contentType('application/json');
            next();
        });
        this.dataProviders = new appData_provider_1.default();
        var appRoute = new app_route_1.default();
        appRoute.mount(this.expApp);
        this.expApp.listen(this.config.port, function (err) {
            if (err)
                console.log(err);
            else
                console.log('Server started on port' + _this.config.port);
        });
    };
    return App;
}());
exports.default = App;
//
