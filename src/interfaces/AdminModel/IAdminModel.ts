import { Document } from "mongoose";
export interface IAdminModel extends Document {
  email: string;
  name: string,
  username: string,
  password: string,
}