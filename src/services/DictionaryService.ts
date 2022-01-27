import Url from "url";
import { Request } from "express";
import DictionaryModel from "../models/DictionaryModel";
import { IDictionaryModel } from "../interfaces/DictionaryModel/IDictionaryModel";
import { IResponseStatus } from "../interfaces/ResponseStatus/IResponseStatus";
import { parseParamsToArray } from "../utils/ParseURL";

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
    const params = parseParamsToArray(searchKey);
    const lastestParams = params[params.length - 1];
    
    if(lastestParams !== "") {
      const result: Array<IDictionaryModel> | null = await DictionaryModel.find({
        [this.params.from]: {
          $regex: "(s+" + lastestParams + "|^" + lastestParams + ")",
          $options: "i",
        },
      })
      .select(this.params.from)
      .limit(5);
      return result;
    } else {
      return []
    }
  };

  translating = async () => {
    const searchKey = this.query.search as string;
    const params = [searchKey];

    const translatingPerWord = params.map(async (itemParams) => {
      const translatingResult: IDictionaryModel | null = await DictionaryModel.where({
        [this.params.from]: itemParams,
      }).findOne();
      if(translatingResult) {
        return this.params.from === 'jaksel' ? translatingResult.artinya : translatingResult.jaksel
      } else {
        return itemParams
      }
    })
    const resultData = await Promise.all(translatingPerWord)
    return resultData.join(" ");
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
