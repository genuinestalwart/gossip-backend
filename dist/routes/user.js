"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const verifyToken_1 = require("../middlewares/verifyToken");
const userRouter = express_1.default.Router();
userRouter.get("/user/:id", verifyToken_1.verifyToken, async (req, res) => {
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
});
exports.default = userRouter;
