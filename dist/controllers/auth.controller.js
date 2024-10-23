"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utilities/password");
const token_1 = require("../utilities/token");
const moment_1 = __importDefault(require("moment"));
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ code: "missing-credentials" });
    }
    const user = await User_1.default.findOne({ email: email.toLowerCase() });
    if (user && (await (0, password_1.verifyPassword)(password, user.password))) {
        const data = {
            createdAt: user.createdAt,
            email: user.email,
            id: user._id.toString(),
        };
        const accessToken = (0, token_1.generateToken)(data);
        res.json({ accessToken, ...data });
    }
    else {
        res.json(null);
    }
};
exports.login = login;
const register = async (req, res) => {
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
};
exports.register = register;
