import { ExtendedRequest } from "@/types/global";
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET || "";

export const verifyToken = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: "unauthorized access" });
	}

	const token = req.headers.authorization.split(" ")[1];

	jwt.verify(token, tokenSecret, (error, decoded) => {
		if (error) {
			return res.status(401).json({ message: "unauthorized access" });
		}

		req.decoded = decoded as JwtPayload;
		next();
	});
};
