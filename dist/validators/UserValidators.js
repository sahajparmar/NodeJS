"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
class UserValidators {
    static signup() {
        return [
            (0, express_validator_1.body)('name', 'Name is required').isString(),
            (0, express_validator_1.body)('email', 'Email is required').isEmail(),
            (0, express_validator_1.body)('password', 'Password is required').isLength({ min: 5 })
                .custom((value, { req }) => {
                if (req.body.email)
                    return true;
                else {
                    throw new Error('Email is not available for validation');
                }
            }),
        ];
    }
}
exports.UserValidators = UserValidators;
