"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signup() {
        return [
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email, // type: 'user'
                })
                    .then((user) => {
                    if (user) {
                        // throw new Error("User Already Exists");
                        throw "User Already Exists";
                    }
                    else {
                        return true;
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("phone", "Phone number is required").isString(),
            (0, express_validator_1.body)("password", "Password is required")
                .isAlphanumeric()
                .isLength({ min: 8, max: 25 })
                .withMessage("Password must be between 8-20 characters"),
            (0, express_validator_1.body)("name", "Name is required").isString(),
            (0, express_validator_1.body)("type", "User role type is required").isString(),
            (0, express_validator_1.body)("status", "User status is required").isString(),
        ];
    }
    static verifyUserEmailToken() {
        return [
            (0, express_validator_1.body)("verification_token", "Email verification token  is required").isNumeric(),
        ];
    }
    static login() {
        return [
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email, // type: 'user'
                })
                    .then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        // throw new Error("No User Register with such Email");
                        throw "No User Register with such Email";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("password", "Password is required").isAlphanumeric(),
        ];
    }
    static checkResetPasswordEmail() {
        return [
            (0, express_validator_1.query)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email, // type: 'user'
                })
                    .then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        // throw new Error("No User Register with such Email");
                        throw "No User Register with such Email";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
        ];
    }
    static verifyResetPasswordToken() {
        return [
            (0, express_validator_1.query)("email", "Email is required").isEmail(),
            (0, express_validator_1.query)("reset_passwordn_token", "Reset password token  is required")
                .isNumeric()
                .custom((reset_password_token, { req }) => {
                return User_1.default.findOne({
                    email: req.query.email, // type: 'user'
                    reset_password_token: reset_password_token,
                    reset_password_token_time: { $gt: Date.now() },
                })
                    .then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        // throw new Error("Reset password token doesn\'t exist. please regenerate a new token.");
                        throw "Reset password token doesn't exist. please regenerate a new token.";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
        ];
    }
    static resetPassword() {
        return [
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                })
                    .then((user) => {
                    if (user) {
                        req.user = user; // get id from here
                        return true;
                    }
                    else {
                        // throw new Error("No User Register with such Email");
                        throw "No User Register with such Email";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("new_password", "New password  is required").isAlphanumeric(),
            (0, express_validator_1.body)("OTP", "Reset password token  is required")
                .isNumeric()
                .custom((reset_password_token, { req }) => {
                if (req.user.reset_password_token == reset_password_token) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    // throw new Error("No User Register with such Email");
                    throw "Reset password token is invalid, please try again";
                }
            }),
        ];
    }
    static verifyPhoneNumber() {
        return [(0, express_validator_1.body)("phone", "phone is required").isString()];
    }
    static verifyUserProfile() {
        return [
            (0, express_validator_1.body)("phone", "phone is required").isString(),
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                console.log(req.user.email);
                // if(req.user.email == email) throw('Please provide a new unique Email Address to update the User Profile')
                return User_1.default.findOne({
                    email: email,
                })
                    .then((user) => {
                    if (user) {
                        // throw new Error("A User with entered email already exist, Please provide a unique email id");
                        throw "A User with entered email already exist, Please provide a unique email id";
                    }
                    else {
                        return true;
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("password", "password  is required").isAlphanumeric(),
        ];
    }
}
exports.UserValidators = UserValidators;
