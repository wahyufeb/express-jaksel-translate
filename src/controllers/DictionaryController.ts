import { Request, Response } from "express";
import IController from "../interfaces/ControllerInterface";
import { IDictionaryModel } from "../interfaces/DictionaryModel/IDictionaryModel";
import DictionaryService from "../services/DictionaryService";
import ResponseFormatter from "../utils/ResponseFormatter";

class DictionaryController implements IController {
	translating = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const result: Array<IDictionaryModel> = await service.translating();

			if(result.length === 0) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Not Found',
					data: null,
				});	
			}
			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Founded result',
				data: result,
			});

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Server Error',
				data: null,
			});
		}
	};

	index = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const dictionaries = await service.getAll();

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Dictionaries data',
				data: dictionaries,
			});

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Server Error',
				data: null,
			});
		}
	};

	create = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const dictionary = await service.save();

			return ResponseFormatter.formatResponse({
				response: res,
				code: 201,
				message: 'Dictionary created',
				data: dictionary,
			});

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Server Error',
				data: null,
			});
		}
	};

	show = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const dictionary = await service.getOne();

			if (!dictionary) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Dictionary not found',
					data: null,
				})
			}

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success get dictionary',
				data: dictionary,
			})

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Server Error',
				data: null,
			});
		}
	};

	update = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const updatingDictionary = await service.update();

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success updating dictionary',
				data: updatingDictionary,
			})

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Server Error',
				data: null,
			});
		}
	};

	delete = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const deletingDictionary = await service.delete();

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success deleting dictionary',
				data: deletingDictionary,
			})

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Server Error',
				data: null,
			});
		}
	};
  
}

export default new DictionaryController();