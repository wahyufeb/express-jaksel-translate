import { Request, response, Response } from "express";
import IController from "../interfaces/ControllerInterface";
import { IDictionaryModel } from "../interfaces/DictionaryModel/IDictionaryModel";
import { IResponseStatus } from "../interfaces/ResponseStatus/IResponseStatus";
import DictionaryService from "../services/DictionaryService";
import ResponseFormatter from "../utils/ResponseFormatter";

class DictionaryController implements IController {
	translating = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const result: string = await service.translating();
			const resultRecomendation: Array<IDictionaryModel> = await service.translatingRecomendation();
			
			if(result === null && resultRecomendation.length === 0) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Kata tidak ditemukan',
					data: null,
				});	
			}

			const responseData: {result: string | null, resultRecomendation: Array<IDictionaryModel> | null} = { result: null, resultRecomendation: null}
			// if(result !== null) {
			// 	responseData.resultRecomendation = null;
			// } else {
			// }
			responseData.resultRecomendation = resultRecomendation;
			responseData.result = result;

			return ResponseFormatter.formatResponse({
				response: res,	
				code: 200,
				message: 'Kata berhasil ditemukan',
				data: responseData
			});

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Error pada server',
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
				message: 'Berhasil mengambil data',
				data: dictionaries,
			});

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Error pada server',
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
				message: 'Kamus berhasil dibuat',
				data: dictionary,
			});

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Error pada server',
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
					message: 'Kamus tidak ditemukan',
					data: null,
				})
			}

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Berhasil ambil kamus',
				data: dictionary,
			})

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Error pada server',
				data: null,
			});
		}
	};

	update = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new DictionaryService(req);
			const {success, message} = await service.handleDuplicate();
			if(!success) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 400,
					message,
					data: null,
				})
			}

			const updatingDictionary = await service.update();
			if(updatingDictionary.matchedCount !== 1){
				return ResponseFormatter.formatResponse({
					response: res,
					code: 400,
					message: 'Gagal mengedit kamus',
					data: null,
				})
			} else {
				const dictionaryId = await service.getOne();
				return ResponseFormatter.formatResponse({
					response: res,
					code: 200,
					message: 'Berhasil mengedit kamus',
					data: dictionaryId,
				})
			}

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Error pada server',
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
				message: 'Berhasil hapus kamus',
				data: deletingDictionary,
			})

		} catch (error) {
			console.log(error);
			return ResponseFormatter.formatResponse({
				response: res,
				code: 500,
				message: 'Error pada server',
				data: null,
			});
		}
	};
  
}

export default new DictionaryController();