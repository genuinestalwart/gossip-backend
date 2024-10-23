import express from "express";
import { verifyToken } from "@/middlewares/verifyToken";
import { getUserData } from "@/controllers/user.controller";
const userRoutes = express.Router();
userRoutes.get("/user/:id", verifyToken, getUserData);
export default userRoutes;
