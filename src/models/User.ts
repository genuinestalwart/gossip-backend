import { model, Schema } from "mongoose";

const user = new Schema({
	avatar: String,
	createdAt: { type: Number, required: true, immutable: true },
	email: { type: String, required: true, immutable: true },
	firstName: { type: String, required: true },
	fullName: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	verified: { type: Boolean, required: true },
});

const User = model("User", user, "users");
export default User;
