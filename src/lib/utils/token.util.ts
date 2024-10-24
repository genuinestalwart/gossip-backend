import jwt from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET || "";

export const generateToken = (data: string | Buffer | object) =>
	jwt.sign(data, tokenSecret, { expiresIn: "1h" });
