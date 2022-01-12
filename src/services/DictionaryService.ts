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

	translating = async () => {
		const searchKey = typeof this.query.search === 'string' ? this.query.search.toLowerCase() : '' as string;
		console.log(searchKey);
		const result: Array<IDictionaryModel> | null = await DictionaryModel.find({ [this.params.from]: { $regex: searchKey} })
		return result;
	}

	getAll = async () => {
		const dictionaries: Array<IDictionaryModel> = await DictionaryModel.find();
		return dictionaries;
	};

	save = async () => {
		const dictionary: IDictionaryModel = await DictionaryModel.create({
			jaksel: this.body.jaksel.toLowerCase(),
			artinya: this.body.artinya.toLowerCase(),
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
