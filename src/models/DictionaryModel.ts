import { model, Model, Schema } from "mongoose"
import { IDictionaryModel } from "../interfaces/DictionaryModel/IDictionaryModel"

const DictionarySchema: Schema = new Schema({
  jaksel: {
    type: String,
    required: true,
  },
  artinya: {
    type: String,
    required: true,
  }
})

const DictionaryModel: Model<IDictionaryModel> = model("kamus", DictionarySchema)

export default DictionaryModel;