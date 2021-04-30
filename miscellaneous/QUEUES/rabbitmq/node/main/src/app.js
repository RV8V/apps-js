"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./entities/product.entity");
typeorm_1.createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27018,
    username: "root",
    password: "password",
    database: "main",
    entities: ["src/entities/*.js"],
    synchronize: true,
    logging: false,
    cli: {
        entitiesDir: "src/entities"
    }
}).then(function (connection) {
    var app = express();
    var productRepository = connection.getRepository(product_entity_1.Product);
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));
    app.use(express.json());
    app.listen(8001, function () {
        console.log('listening on port 8001 mongo');
    });
}).catch(function (error) { return console.log(error); });
