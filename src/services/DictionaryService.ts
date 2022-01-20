import { Request } from "express";
import DictionaryModel from "../models/DictionaryModel";
import { IDictionaryModel } from "../interfaces/DictionaryModel/IDictionaryModel";
import { IResponseStatus } from "../interfaces/ResponseStatus/IResponseStatus";

class DictionaryService {
  credentials: {
    id: number;
  };

  body: Request["body"];
  params: Request["params"];
  query: Request["query"];

  constructor(req: Request) {
    this.credentials = req.app.locals.credentials;
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  translatingRecomendation = async () => {
    const searchKey = this.query.search as string;
    const result: Array<IDictionaryModel> | null = await DictionaryModel.find({
      [this.params.from]: {
        $regex: "(s+" + searchKey + "|^" + searchKey + ")",
        $options: "i",
      },
    })
      .select(this.params.from)
      .limit(5);
    return result;
  };

  translating = async () => {
    const searchKey = this.query.search as string;
    const result: IDictionaryModel | null = await DictionaryModel.where({
      [this.params.from]: searchKey,
    }).findOne();
    return result;
  };

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
    const dictionary: IDictionaryModel | null = await DictionaryModel.findById(
      id
    );
    return dictionary;
  };

  update = async () => {
    const { id } = this.params;
    const { jaksel, artinya } = this.body;
    const updatingDictionary = await DictionaryModel.updateOne(
      { _id: id },
      { jaksel: jaksel, artinya: artinya }
    );
    return updatingDictionary;
  };

  delete = async () => {
    const { id } = this.params;
    const deletingTodo = await DictionaryModel.deleteOne({ _id: id });
    return deletingTodo;
  };

  handleDuplicate = async () :Promise<IResponseStatus> => {
    const { id } = this.params;
    const { jaksel, artinya } = this.body;
    const checkDuplicate = await DictionaryModel.find({ _id: { $ne: id } });

    if (checkDuplicate.length > 0) {
      let result: IResponseStatus = {success: false, message: ""};
      for (let i = 0; i < checkDuplicate.length; i++) {
        const item = checkDuplicate[i];
        if (item.jaksel.toLowerCase() === jaksel.toLowerCase()) {
          result = { success: false, message: "Bahasa jaksel sudah digunakan" };
          break;
        } else if(item.artinya.toLowerCase() === artinya.toLowerCase()) {
          result = { success: false, message: "Arti sudah digunakan" };
          break;
        } else {
          result = { success: true, message: "Bahasa jaksel dan arti tidak ada yang sama" };
          break;
        }
      }
      return result;
    } else {
      return {
        success: true,
        message: "Bahasa jaksel dan arti tidak ada yang sama",
      };
    }
  };
}

export default DictionaryService;
