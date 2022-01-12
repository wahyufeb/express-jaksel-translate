import { Document } from "mongoose";
export interface IDictionaryModel extends Document {
  jaksel: string;
  artinya: string;
}