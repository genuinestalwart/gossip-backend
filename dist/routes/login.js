"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utilities/password");
const token_1 = require("../utilities/token");
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
loginRouter.post("/login", async (req, res) => {
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
});
exports.default = loginRouter;
