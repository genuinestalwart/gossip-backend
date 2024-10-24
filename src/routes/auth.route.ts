import { google, login, register } from "@/controllers/auth.controller";
import express from "express";
const authRoutes = express.Router();
authRoutes.post("/google", google);
authRoutes.post("/login", login);
authRoutes.post("/register", register);
export default authRoutes;
