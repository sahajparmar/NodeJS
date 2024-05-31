"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserValidators_1 = require("../validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.post("/signup", UserValidators_1.UserValidators.signup(), UserController_1.UserController.signup);
        this.router.get("/test", UserController_1.UserController.signup, UserController_1.UserController.test1, UserController_1.UserController.test2);
    }
    postRoutes() { }
    patchRoutes() { }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
