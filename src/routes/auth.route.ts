import { login, register } from "@/controllers/auth.controller";
import express from "express";
const authRoutes = express.Router();
authRoutes.post("/login", login);
authRoutes.post("/register", register);
export default authRoutes;
