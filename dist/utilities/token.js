"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET || "";
const generateToken = (data) => jsonwebtoken_1.default.sign(data, tokenSecret, { expiresIn: "1h" });
exports.generateToken = generateToken;
/*
Generating token secret
$ node
$ require("crypto").randomBytes(64).toString("hex")
*/
