import jwt from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET || "";

export const generateToken = (data: string | Buffer | object) =>
	jwt.sign(data, tokenSecret, { expiresIn: "1h" });

/*
Generating token secret
$ node
$ require("crypto").randomBytes(64).toString("hex")
*/
