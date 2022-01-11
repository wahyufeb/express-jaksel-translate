import { Request, Response, NextFunction } from 'express';
import {
	check,
	validationResult,
	CustomValidator,
	ValidationChain,
} from 'express-validator';
const db = require('../db/models');

const isValidEmail: CustomValidator = (value) => {
	if (value) {
		return db.user
			.findOne({ where: { email: value } })
			.then((checkUser: any) => {
				if (checkUser) {
					return Promise.reject('Email sudah digunakan');
				}
			});
	}
};

const isValidUsername: CustomValidator = (value) => {
	if (value) {
		return db.user
			.findOne({ where: { username: value } })
			.then((checkUser: any) => {
				if (checkUser) {
					return Promise.reject('Username sudah digunakan');
				}
			});
	}
};

export const registrationValidate = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email tidak boleh kosong')
		.isEmail()
		.withMessage('Email tidak valid')
		.custom(isValidEmail),
	check('name')
		.not()
		.isEmpty()
		.withMessage('Nama tidak boleh kosong')
		.isString()
		.withMessage('Tidak boleh mengandung angka')
		.isLength({ min: 2, max: 30 })
		.withMessage('Panjang nama minimal 2 karakter dan maksimal 15 karakter'),
	check('username')
		.not()
		.isEmpty()
		.withMessage('Username tidak boleh kosong')
		.isString()
		.withMessage('Tidak boleh mengandung angka')
		.isLength({ min: 2, max: 10 })
		.withMessage('Panjang nama minimal 2 karakter dan maksimal 10 karakter')
		.custom(isValidUsername),
	check('password')
		.not()
		.isEmpty()
		.withMessage('Password tidak boleh kosong')
		.isLength({ min: 8 })
		.withMessage('Panjang password minimal 8'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json(errors);
		}

		return next();
	},
];

export const loginValidate = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email tidak boleh kosong')
		.isEmail()
		.withMessage('Email tidak valid'),
	check('password').not().isEmpty().withMessage('Password tidak boleh kosong'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json(errors);
		}

		next();
	},
];
