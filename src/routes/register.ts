import User from "@/models/User";
import { encryptPassword } from "@/utilities/password";
import express from "express";
import moment from "moment";
export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
	const { email, firstName, fullName, password: rawPassword } = req.body;
	const password = await encryptPassword(rawPassword);
	const createdAt = moment().unix();

	const user = await User.create({
		createdAt,
		email,
		firstName,
		fullName,
		password,
		role: "user",
		verified: false,
	});

	res.json({
		avatar: user.avatar,
		createdAt: user.createdAt,
		email: user.email,
		firstName: user.firstName,
		fullName: user.fullName,
		id: user._id.toString(),
		role: user.role,
		verified: user.verified,
	});
});
