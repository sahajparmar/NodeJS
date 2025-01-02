"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserValidators_1 = require("../validators/UserValidators");
const Globalmiddleware_1 = require("../middlewares/Globalmiddleware");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes(); // read data from server.
        this.postRoutes(); // add some data to server.
        this.patchRoutes(); // partially update an existing resource.
        this.putRoutes(); // update an existing resource or cerate it if doesn't exist.
        this.deleteRoutes(); // delete data from server.
    }
    getRoutes() {
        this.router.get("/send/verification/email", Globalmiddleware_1.GlobalMiddleware.auth, UserController_1.UserController.resendVerificationEmail);
        this.router.get("/send/reset/password/token", UserValidators_1.UserValidators.checkResetPasswordEmail(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.sendResetPasswordOTP);
        this.router.get("/verify/resetPasswordToken", UserValidators_1.UserValidators.verifyResetPasswordToken(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyResetPasswordToken);
        this.router.get("/profile", Globalmiddleware_1.GlobalMiddleware.auth, UserController_1.UserController.profile);
    }
    postRoutes() {
        this.router.post("/signup", UserValidators_1.UserValidators.signup(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.signup);
        this.router.post("/login", UserValidators_1.UserValidators.login(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.login);
    }
    patchRoutes() {
        this.router.patch("/verify/emailToken", Globalmiddleware_1.GlobalMiddleware.auth, UserValidators_1.UserValidators.verifyUserEmailToken(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyUserEmailToken);
        this.router.patch("/reset/password", UserValidators_1.UserValidators.resetPassword(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.resetPassword);
        this.router.patch("/update/phone", Globalmiddleware_1.GlobalMiddleware.auth, UserValidators_1.UserValidators.verifyPhoneNumber(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updatePhoneNumber);
        this.router.patch("/update/profile", Globalmiddleware_1.GlobalMiddleware.auth, UserValidators_1.UserValidators.verifyUserProfile(), Globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updateUserProfile);
    }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
