import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import UserModel from "@/models/users.model";

export const getUserData = async (req: Request, res: Response) => {
	try {
		const _id = new ObjectId(req.params.id);
		const user = await UserModel.findOne({ _id });

		res.json(
			user
				? {
						avatar: user.avatar,
						createdAt: user.createdAt,
						email: user.email,
						firstName: user.firstName,
						fullName: user.fullName,
						id: user._id.toString(),
						linkedAccounts: user.linkedAccounts,
						role: user.role,
						verified: user.verified,
				  }
				: null
		);
	} catch (error) {
		res.json(null);
	}
};
