import { Request, Response } from 'express';
import AuthenticationUtils from '../utils/AuthenticationUtils';
const db = require('../db/models');

class AuthController {
	registration = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, name, username, password } = req.body;

			const hashedPassword: string = await AuthenticationUtils.passwordHash(
				password,
			);
			const registrationProcess = await db.user.create({
				email,
				name,
				username,
				password: hashedPassword,
			});

			if (!registrationProcess) {
				res.json('Registration Failed');
			}

			return res.json({
				message: 'Registration sucess',
				data: registrationProcess,
			});
		} catch (error) {
			console.log(error);
			return res.json({
				message: 'Sever Error',
				error,
			});
		}
	};

	login = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, password } = req.body;

			const user = await db.user.findOne({
				where: { email },
			});

			if (!user) {
				return res.json('Pengguna tidak ditemukan');
			}

			const comparingPassword: boolean =
				await AuthenticationUtils.passwordCompare(password, user.password);
			if (!comparingPassword) {
				return res.json('Password salah');
			}

			const token = AuthenticationUtils.generateToken(
				user.id,
				user.email,
				user.username,
				user.password,
			);

			return res.json({
				token,
			});
		} catch (error) {
			console.log(error);
			return res.json({
				message: 'Sever Error',
				error: error,
			});
		}
	};

	profile = async (req: Request, res: Response): Promise<Response> => {
		try {
			return res.json(req.app.locals.credentials);
		} catch (error) {
			console.log(error);
			return res.json({
				mesasge: 'Server error',
				error,
			});
		}
	};
}

export default new AuthController();
