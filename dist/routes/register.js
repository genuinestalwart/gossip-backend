"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utilities/password");
const token_1 = require("../utilities/token");
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const registerRouter = express_1.default.Router();
registerRouter.post("/register", async (req, res) => {
    const { email, firstName, fullName, password: rawPassword } = req.body;
    if (!email || !firstName || !fullName || !rawPassword) {
        res.status(400).json({ code: "missing-credentials" });
    }
    const password = await (0, password_1.encryptPassword)(rawPassword);
    const createdAt = (0, moment_1.default)().unix();
    const user = await User_1.default.create({
        createdAt,
        email: email.toLowerCase(),
        firstName,
        fullName,
        password,
        role: "user",
        verified: false,
    });
    const data = {
        createdAt: user.createdAt,
        email: user.email,
        id: user._id.toString(),
    };
    const accessToken = (0, token_1.generateToken)(data);
    res.json({ accessToken, ...data });
});
exports.default = registerRouter;
