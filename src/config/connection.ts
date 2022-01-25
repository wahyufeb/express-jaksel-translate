import { ConnectOptions, connect } from "mongoose";
require("dotenv").config();
export const connectingToMongoDB = async () => {
  try {
    const mongoURI: string = process.env.MONGODB_URI || "";
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;
    await connect(mongoURI, options);
    console.log(`MongoDB connected at ${mongoURI}`);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
