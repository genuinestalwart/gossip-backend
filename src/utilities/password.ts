import bcrypt from "bcrypt";

export const encryptPassword = async (password: string) => {
	try {
		return bcrypt.hash(password, 10);
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const verifyPassword = async (plain: string, hashed: string) => {
	try {
		return bcrypt.compare(plain, hashed);
	} catch (error) {
		console.error(error);
		return false;
	}
};
