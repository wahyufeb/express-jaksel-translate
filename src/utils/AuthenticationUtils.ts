import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthenticationUtils {
	public static passwordHash = (password: string): Promise<string> => {
		return bcrypt.hash(password, 15);
	};

	public static passwordCompare = async (
		text: string,
		encryptedText: string,
	): Promise<boolean> => {
		const result = await bcrypt.compare(text, encryptedText);
		return result;
	};

	public static generateToken = (
		id: number,
		email: string,
		username: string,
		password: string,
	): string => {
		const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
		const token: string = jwt.sign(
			{ id, email, username, password },
			secretKey,
		);
		return token;
	};
}

export default AuthenticationUtils;
