"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.google = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const password_util_1 = require("../lib/utils/password.util");
const token_util_1 = require("../lib/utils/token.util");
const moment_1 = __importDefault(require("moment"));
const sendUserData = (res, user) => {
    const data = {
        createdAt: user.createdAt,
        email: user.email,
        id: user._id.toString(),
    };
    const accessToken = (0, token_util_1.generateToken)(data);
    res.json({ accessToken, ...data });
};
const google = async (req, res) => {
    const { email, email_verified, image, name } = req.body;
    if (!email || !image || !name) {
        res.status(400).json({ code: "missing-credentials" });
    }
    let user = await users_model_1.default.findOne({ email: email.toLowerCase() });
    if (user) {
        if (!user.avatar) {
            user.avatar = image;
        }
        user.verified = user.verified || email_verified ? true : false;
        user.linkedAccounts.google = true;
        await user.save();
    }
    else {
        const createdAt = (0, moment_1.default)().unix();
        user = await users_model_1.default.create({
            avatar: image,
            createdAt,
            email: email.toLowerCase(),
            firstName: name.slice(0, 10).split(" ")[0],
            fullName: name.slice(0, 50),
            linkedAccounts: { google: true },
            password: "",
            role: "user",
            verified: email_verified,
        });
    }
    sendUserData(res, user);
};
exports.google = google;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ code: "missing-credentials" });
    }
    const user = await users_model_1.default.findOne({ email: email.toLowerCase() });
    if (user && !user.password) {
        res.status(409).json({ code: "account-already-linked" });
    }
    else if (user && (await (0, password_util_1.verifyPassword)(password, user.password))) {
        sendUserData(res, user);
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
    if (await users_model_1.default.exists({ email: email.toLowerCase() })) {
        res.status(409).json({ code: "account-already-linked" });
    }
    const password = await (0, password_util_1.encryptPassword)(rawPassword);
    const createdAt = (0, moment_1.default)().unix();
    const user = await users_model_1.default.create({
        createdAt,
        email: email.toLowerCase(),
        firstName,
        fullName,
        linkedAccounts: { google: false },
        password,
        role: "user",
        verified: false,
    });
    sendUserData(res, user);
};
exports.register = register;
