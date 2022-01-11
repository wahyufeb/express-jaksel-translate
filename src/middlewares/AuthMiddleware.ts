import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
	if (!req.headers.authorization) {
		return res.status(401).json('Token tidak ada');
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
