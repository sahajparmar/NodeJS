"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const environments_1 = require("./environments/environments");
const UserRouter_1 = require("./routers/UserRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const BannerRouter_1 = require("./routers/BannerRouter");
class Server {
    constructor() {
        // create a class
        this.app = express();
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handlerErrors();
    }
    setConfigs() {
        this.connectMongoDB(); // conecting MongoDB database
        this.allowCors();
        this.configureBodyParser();
    }
    connectMongoDB() {
        mongoose.connect((0, environments_1.getEnvironmentVariables)().db_uri).then(() => {
            console.log("Connected to mongodb.");
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true, // pass any kind of data.
        }));
    }
    allowCors() {
        this.app.use(cors());
    }
    setRoutes() {
        this.app.use('src/uploads', express.static('src/uploads'));
        this.app.use("/api/user/", UserRouter_1.default);
        this.app.use("/api/banner/", BannerRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not found",
                status_code: 404,
            });
        });
    }
    handlerErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong, Please try again",
                status_code: errorStatus,
            });
        });
    }
}
exports.Server = Server;
