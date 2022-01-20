import { Request, Response, NextFunction } from "express";
import { check, validationResult, CustomValidator, ValidationChain } from "express-validator";
import DictionaryModel from "../models/DictionaryModel";

const isValidJaksel: CustomValidator = (value) => {
	if (value) {
		return DictionaryModel.find({
      jaksel: {
        $regex: value,
        $options: "i",
      },
    })
			.then((dictionary) => {
				if (dictionary.length > 0) {
					return Promise.reject('Bahasa Jaksel sudah digunakan');
				}
			})
	}
};

const isValidArtinya: CustomValidator = (value) => {
	if (value) {
		return DictionaryModel.find({
      artinya: {
        $regex: value,
        $options: "i",
      },
    })
			.then((dictionary) => {
				if (dictionary.length > 0) {
					return Promise.reject('Artinya sudah digunakan');
				}
			})
	}
}

export const dictionaryValidate = [
  check("jaksel")
    .not()
    .isEmpty()
    .withMessage("Bahasa Jaksel tidak boleh kosong")
    .isLength({ min: 2 })
    .withMessage("Panjang 'bahasa Jaksel' minimal 2")
		.custom(isValidJaksel),
  check("artinya")
    .not()
    .isEmpty()
    .withMessage("Artinya tidak boleh kosong")
    .isLength({ min: 2 })
    .withMessage("Panjang 'artinya' minimal 2")
		.custom(isValidArtinya),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors);
    }

    return next();
  },
];

export const updateDictionaryValidate = [
  check("jaksel")
    .not()
    .isEmpty()
    .withMessage("Bahasa Jaksel tidak boleh kosong")
    .isLength({ min: 2 })
    .withMessage("Panjang 'bahasa Jaksel' minimal 2"),
  check("artinya")
    .not()
    .isEmpty()
    .withMessage("Artinya tidak boleh kosong")
    .isLength({ min: 2 })
    .withMessage("Panjang 'artinya' minimal 2")
];
