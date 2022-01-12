import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ResponseFormatter from '../utils/ResponseFormatter';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
	if (!req.headers.authorization) {
		return ResponseFormatter.formatResponse({
			response: res,
			code: 401,
			message: 'Token tidak ada',
			data: null,
		})
	}

	const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
	const token: string = req.headers.authorization.split(' ')[1];

	try {
		jwt.verify(token, secretKey, (err, credentials) => {
			if (err) {
				return res.json('Token invalid, silahkan login kembali');
			}

			req.app.locals.credentials = credentials;
			return next();
		});
	} catch (error) {
		console.log(error);
		return res.json(error);
	}
};
