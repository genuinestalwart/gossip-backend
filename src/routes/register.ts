import User from "@/models/User";
import { encryptPassword } from "@/utilities/password";
import { generateToken } from "@/utilities/token";
import express from "express";
import moment from "moment";
export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
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
});
