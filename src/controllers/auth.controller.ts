import UserModel from "@/models/users.model";
import { User } from "@/types/global";
import { encryptPassword, verifyPassword } from "@/lib/utils/password.util";
import { generateToken } from "@/lib/utils/token.util";
import { Request, Response } from "express";
import moment from "moment";

const sendUserData = (res: Response, user: User) => {
	const data = {
		createdAt: user.createdAt,
		email: user.email,
		id: user._id.toString(),
	};

	const accessToken = generateToken(data);
	res.json({ accessToken, ...data });
};

export const google = async (req: Request, res: Response) => {
	const { email, email_verified, image, name } = req.body;

	if (!email || !image || !name) {
		res.status(400).json({ code: "missing-credentials" });
	}

	let user = await UserModel.findOne({ email: email.toLowerCase() });

	if (user) {
		if (!user.avatar) {
			user.avatar = image;
		}

		user.verified = user.verified || email_verified ? true : false;
		user.linkedAccounts.google = true;
		await user.save();
	} else {
		const createdAt = moment().unix();

		user = await UserModel.create({
			avatar: image,
			createdAt,
			email: email.toLowerCase(),
			firstName: name.slice(0, 10).split(" ")[0],
			fullName: name.slice(0, 50),
			linkedAccounts: { google: true },
			password: "",
			role: "user",
			verified: email_verified,
		});
	}

	sendUserData(res, user);
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ code: "missing-credentials" });
	}

	const user = await UserModel.findOne({ email: email.toLowerCase() });

	if (user && !user.password) {
		res.status(409).json({ code: "account-already-linked" });
	} else if (user && (await verifyPassword(password, user.password))) {
		sendUserData(res, user);
	} else {
		res.json(null);
	}
};

export const register = async (req: Request, res: Response) => {
	const { email, firstName, fullName, password: rawPassword } = req.body;

	if (!email || !firstName || !fullName || !rawPassword) {
		res.status(400).json({ code: "missing-credentials" });
	}

	if (await UserModel.exists({ email: email.toLowerCase() })) {
		res.status(409).json({ code: "account-already-linked" });
	}

	const password = await encryptPassword(rawPassword);
	const createdAt = moment().unix();

	const user = await UserModel.create({
		createdAt,
		email: email.toLowerCase(),
		firstName,
		fullName,
		linkedAccounts: { google: false },
		password,
		role: "user",
		verified: false,
	});

	sendUserData(res, user);
};
