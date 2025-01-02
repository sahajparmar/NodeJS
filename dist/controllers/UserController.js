"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const Jwt_1 = require("../utils/Jwt");
const NodeMailer_1 = require("../utils/NodeMailer");
const Utils_1 = require("../utils/Utils");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("req: ", req);
            const email = req.body.email;
            const phone = req.body.phone;
            const password = req.body.password;
            const name = req.body.name;
            const type = req.body.type;
            const status = req.body.status;
            const verification_token = Utils_1.Utils.generateVerificationToken();
            try {
                const hash = yield Utils_1.Utils.encryptPassword(password);
                const data = {
                    email,
                    verification_token,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME,
                    phone,
                    password: hash,
                    name,
                    type,
                    status,
                };
                let user = yield new User_1.default(data).save();
                const payload = {
                    // user._id: user._id,
                    aud: user._id,
                    email: user.email,
                    type: user.type
                };
                const token = Jwt_1.Jwt.jwtSign(payload);
                res.json({
                    token: token,
                    user: user,
                });
                // send email to user for verification
                yield NodeMailer_1.NodeMailer.sendMail({
                    to: [user.email],
                    subject: "Email Verification",
                    html: `<h1>Your Otp is ${verification_token}</h1>`,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyUserEmailToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification_token = req.body.verification_token;
            const email = req.body.email;
            try {
                const user = yield User_1.default.findOneAndUpdate({
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: { $gt: Date.now() },
                }, {
                    email_verified: true,
                    updated_at: new Date(),
                }, {
                    new: true,
                });
                if (user) {
                    res.send(user);
                }
                else {
                    throw new Error("Wrong Otp or Email Verification Token Is Expired. Please try again...");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendVerificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send(req.decoded);
            const email = req.user.email;
            const verification_token = Utils_1.Utils.generateVerificationToken();
            try {
                const user = yield User_1.default.findOneAndUpdate({
                    email: email,
                }, {
                    updated_at: new Date(),
                    verification_token: verification_token,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME,
                });
                if (user) {
                    res.json({ success: true });
                    yield NodeMailer_1.NodeMailer.sendMail({
                        to: [user.email],
                        subject: "Resend Email Verification",
                        html: `<h1>Your Otp is ${verification_token}</h1>`,
                    });
                }
                else {
                    throw new Error("User doesn't exist");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    // static async resendVerificationEmail(req, res, next) {
    //   try {
    //   } catch (e) {
    //     next(e);
    //   }
    // }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const password = req.body.password;
            const data = {
                password,
                encrypt_password: user.password,
            };
            try {
                yield Utils_1.Utils.comparePassword(data);
                const payload = {
                    // user._id: user._id,
                    aud: user._id,
                    email: user.email,
                    type: user.type
                };
                const token = Jwt_1.Jwt.jwtSign(payload);
                res.json({
                    token: token,
                    user: user,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static sendResetPasswordOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            const reset_password_token = Utils_1.Utils.generateVerificationToken();
            try {
                const user = yield User_1.default.findOneAndUpdate({
                    email: email,
                }, {
                    updated_at: new Date(),
                    reset_password_token: reset_password_token,
                    reset_password_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME,
                });
                if (user) {
                    res.json({ success: true });
                    yield NodeMailer_1.NodeMailer.sendMail({
                        to: [user.email],
                        subject: "Resend password email verification OTP",
                        html: `<h1>Your Otp is ${reset_password_token}</h1>`,
                    });
                }
                else {
                    throw new Error("User doesn't exist");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyResetPasswordToken(req, res, next) {
        res.json({ success: true });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const new_password = req.body.new_password;
            try {
                const encryptedPassword = yield Utils_1.Utils.encryptPassword(new_password);
                const updatedUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, {
                    updated_at: new Date(),
                    password: encryptedPassword,
                }, { new: true });
                if (updatedUser) {
                    res.send(updatedUser);
                }
                else {
                    throw new Error("User doesn't exist");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                const profile = yield User_1.default.findById(user.aud);
                if (profile) {
                    res.send(profile);
                }
                else {
                    throw new Error("User doesn't exist");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updatePhoneNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const phone = req.body.phone;
            try {
                const userData = yield User_1.default.findByIdAndUpdate(user.aud, { phone: phone, updated_at: new Date() }, { new: true });
                res.send(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const phone = req.body.phone;
            const new_email = req.body.email;
            const plain_password = req.body.password;
            const verification_token = Utils_1.Utils.generateVerificationToken();
            try {
                const userData = yield User_1.default.findById(user.aud);
                if (!userData)
                    throw new Error("User doesn't exist");
                yield Utils_1.Utils.comparePassword,
                    {
                        password: plain_password,
                        encrypt_password: userData.password,
                    };
                const updatedUser = yield User_1.default.findByIdAndUpdate(user.aud, {
                    phone: phone,
                    email: new_email,
                    email_verified: false,
                    verification_token,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME,
                    updated_at: new Date(),
                }, { new: true });
                const payload = {
                    // user._id: user._id,
                    aud: user.aud,
                    email: updatedUser.email,
                    type: updatedUser.type
                };
                const token = Jwt_1.Jwt.jwtSign(payload);
                res.json({
                    token: token,
                    user: updatedUser,
                });
                // send email to user for updated email verification
                yield NodeMailer_1.NodeMailer.sendMail({
                    to: [updatedUser.email],
                    subject: "Email Verification",
                    html: `<h1>Your Otp is ${verification_token}</h1>`,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
