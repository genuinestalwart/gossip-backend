"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET || "";
const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "unauthorized access" });
    }
    const token = req.headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, tokenSecret, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
