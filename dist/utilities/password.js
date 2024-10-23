"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = async (password) => {
    try {
        return bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.encryptPassword = encryptPassword;
const verifyPassword = async (plain, hashed) => {
    try {
        return bcrypt_1.default.compare(plain, hashed);
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.verifyPassword = verifyPassword;
