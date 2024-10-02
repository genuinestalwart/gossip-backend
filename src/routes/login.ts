import User from "@/models/User";
import { verifyPassword } from "@/utilities/password";
import express from "express";
export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		const matched = await verifyPassword(password, user.password);

		res.json(
			matched
				? {
						avatar: user.avatar,
						createdAt: user.createdAt,
						email: user.email,
						firstName: user.firstName,
						fullName: user.fullName,
						id: user._id.toString(),
						role: user.role,
						verified: user.verified,
				  }
				: null
		);
	} else {
		res.json(null);
	}
});
