"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middlewares/verifyToken");
const user_controller_1 = require("../controllers/user.controller");
const userRoutes = express_1.default.Router();
userRoutes.get("/user/:id", verifyToken_1.verifyToken, user_controller_1.getUserData);
exports.default = userRoutes;
