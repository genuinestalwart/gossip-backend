"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = void 0;
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../models/User"));
const getUserData = async (req, res) => {
    try {
        const _id = new mongodb_1.ObjectId(req.params.id);
        const user = await User_1.default.findOne({ _id });
        res.json(user
            ? {
                avatar: user.avatar,
                createdAt: user.createdAt,
                email: user.email,
                firstName: user.firstName,
                fullName: user.fullName,
                id: user._id.toString(),
                role: user.role,
                verified: user.verified,
            }
            : null);
    }
    catch (error) {
        res.json(null);
    }
};
exports.getUserData = getUserData;
