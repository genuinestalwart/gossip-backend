import bcrypt from "bcrypt";

export const encryptPassword = async (password: string) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	} catch (error) {
		console.error(error);
	}
};

export const verifyPassword = async (plain: string, hashed: string) => {
	try {
		const match = await bcrypt.compare(plain, hashed);
		return match;
	} catch (error) {
		console.error(error);
	}
};
