import { Request } from "express";
import { Types } from "mongoose";

export interface ExtendedRequest extends Request {
	decoded?: object;
}

export interface User {
	_id: Types.ObjectId;
	avatar?: string;
	createdAt: number;
	email: string;
	firstName: string;
	fullName: string;
	linkedAccounts: { google: boolean };
	password: string;
	role: string;
	verified: boolean;
}
