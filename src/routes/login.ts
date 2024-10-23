import User from "@/models/User";
import { verifyPassword } from "@/utilities/password";
import { generateToken } from "@/utilities/token";
import express from "express";
const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
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
});

export default loginRouter;
