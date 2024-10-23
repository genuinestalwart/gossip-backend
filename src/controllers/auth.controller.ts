import User from "@/models/User";
import { encryptPassword, verifyPassword } from "@/utilities/password";
import { generateToken } from "@/utilities/token";
import { Request, Response } from "express";
import moment from "moment";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ code: "missing-credentials" });
	}

	const user = await User.findOne({ email: email.toLowerCase() });

	if (user && (await verifyPassword(password, user.password))) {
		const data = {
			createdAt: user.createdAt,
			email: user.email,
			id: user._id.toString(),
		};

		const accessToken = generateToken(data);
		res.json({ accessToken, ...data });
	} else {
		res.json(null);
	}
};

export const register = async (req: Request, res: Response) => {
	const { email, firstName, fullName, password: rawPassword } = req.body;

	if (!email || !firstName || !fullName || !rawPassword) {
		res.status(400).json({ code: "missing-credentials" });
	}

	const password = await encryptPassword(rawPassword);
	const createdAt = moment().unix();

	const user = await User.create({
		createdAt,
		email: email.toLowerCase(),
		firstName,
		fullName,
		password,
		role: "user",
		verified: false,
	});

	const data = {
		createdAt: user.createdAt,
		email: user.email,
		id: user._id.toString(),
	};

	const accessToken = generateToken(data);
	res.json({ accessToken, ...data });
};
