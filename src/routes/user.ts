import { ObjectId } from "mongodb";
import express from "express";
import User from "@/models/User";
import { verifyToken } from "@/middlewares/verifyToken";
export const userRouter = express.Router();

userRouter.get("/:id", verifyToken, async (req, res) => {
	try {
		const _id = new ObjectId(req.params.id);
		const user = await User.findOne({ _id });

		res.json(
			user
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
	} catch (error) {
		res.json(null);
	}
});
