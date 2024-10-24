import { User } from "@/types/global";
import { model, Schema } from "mongoose";

const user = new Schema<User>({
	avatar: String,
	createdAt: { type: Number, required: true, immutable: true },
	email: { type: String, required: true, immutable: true },
	firstName: { type: String, required: true },
	fullName: { type: String, required: true },
	linkedAccounts: {
		type: { google: { type: Boolean, required: true } },
		required: true,
	},
	password: { type: String, required: true },
	role: { type: String, required: true },
	verified: { type: Boolean, required: true },
});

const UserModel = model("User", user, "users");
export default UserModel;
