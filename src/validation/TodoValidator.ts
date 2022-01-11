import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const todoValidate = [
	check('description')
		.not()
		.isEmpty()
		.withMessage('Deskripsi tidak boleh kosong')
		.isLength({ min: 6 })
		.withMessage('Panjang deskripsi minimal 6'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json(errors);
		}

		return next();
	},
];
