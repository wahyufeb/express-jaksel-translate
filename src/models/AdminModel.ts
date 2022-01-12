import { model, Model, Schema } from "mongoose"
import { IAdminModel } from "../interfaces/AdminModel/IAdminModel"

const DictionarySchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

const AdminModel: Model<IAdminModel> = model("admin", DictionarySchema)

export default AdminModel;