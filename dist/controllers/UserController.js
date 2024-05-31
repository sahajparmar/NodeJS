"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_validator_1 = require("express-validator");
class UserController {
    static signup(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // const user = new User({
        //   email,
        //   password,
        // });
        // user
        //   .save()
        //   .then((user) => {
        //     res.send(user);
        //   })
        //   .catch((e) => {
        //     next(e);
        //   });
    }
    static test1(req, res, next) {
        console.log("test");
        req.msg = "this is test";
        next();
    }
    static test2(req, res) {
        res.send(req.msg);
    }
}
exports.UserController = UserController;
