"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
try {
    var app = new app_1.default({
        port: 3000,
        applicationName: 'typescript server'
    });
    app.run();
}
catch (err) {
    console.log(err);
}
