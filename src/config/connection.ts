import {ConnectOptions, connect} from "mongoose";
require("dotenv").config();
export const connectingToMongoDB = async () => {
  try {
    const mongoURI: string = (process.env.NODE_ENV === 'development' ? process.env.MONGODB_URI_DEV  : process.env.MONGODB_URI_PROD) || "mongodb://localhost:27017/jaksel-translate"
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
    console.log(mongoURI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
