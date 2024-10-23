import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import User from "@/models/User";

export const getUserData = async (req: Request, res: Response) => {
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
};
