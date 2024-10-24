"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    avatar: String,
    createdAt: { type: Number, required: true, immutable: true },
    email: { type: String, required: true, immutable: true },
    firstName: { type: String, required: true },
    fullName: { type: String, required: true },
    linkedAccounts: {
        type: { google: { type: Boolean, required: true } },
        required: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    verified: { type: Boolean, required: true },
});
const UserModel = (0, mongoose_1.model)("User", user, "users");
exports.default = UserModel;
