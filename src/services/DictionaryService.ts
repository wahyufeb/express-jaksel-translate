import { Request } from 'express';
import DictionaryModel from '../models/DictionaryModel';
import { IDictionaryModel } from '../interfaces/DictionaryModel/IDictionaryModel';

class DictionaryService {
	credentials: {
		id: number;
	};

	body: Request['body'];
	params: Request['params'];
	query: Request['query'];

	constructor(req: Request) {
		this.credentials = req.app.locals.credentials;
		this.body = req.body;
		this.params = req.params;
		this.query = req.query
	}

	translatingRecomendation = async () => {
		const searchKey = this.query.search as string;
		const result: Array<IDictionaryModel> | null = await DictionaryModel.find({ [this.params.from]: { '$regex': '(\s+'+searchKey+'|^'+searchKey+')', '$options': 'i' } }).select(this.params.from).limit(5);
		return result;
	}

	translating = async () => {
		const searchKey = this.query.search as string;
		const result: IDictionaryModel | null = await DictionaryModel.where({ [this.params.from]: searchKey }).findOne();
		return result;
	}

	getAll = async () => {
		const dictionaries: Array<IDictionaryModel> = await DictionaryModel.find();
		return dictionaries;
	};

	save = async () => {
		const dictionary: IDictionaryModel = await DictionaryModel.create({
			jaksel: this.body.jaksel,
			artinya: this.body.artinya,
		});

		return dictionary;
	};

	getOne = async () => {
		const { id } = this.params;
		const dictionary: IDictionaryModel | null = await DictionaryModel.findById(id);
		return dictionary;
	};

	update = async () => {
		const { id } = this.params;
		const { jaksel, artinya } = this.body;
		const updatingDictionary = await DictionaryModel.updateOne({ _id: id }, { jaksel: jaksel.toLowerCase(), artinya: artinya.toLowerCase() });
		return updatingDictionary 
	};

	delete = async () => {
		const { id } = this.params;
		const deletingTodo = await DictionaryModel.deleteOne({ _id: id });
		return deletingTodo;
	};
}

export default DictionaryService;
