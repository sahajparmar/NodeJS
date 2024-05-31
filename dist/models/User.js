"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as mongoose from 'mongoose';
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("users", userSchema);
