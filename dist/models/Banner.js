"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as mongoose from 'mongoose';
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose.Schema({
    banner: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});
exports.default = (0, mongoose_1.model)("banner", bannerSchema);
