import {ConnectOptions, connect} from "mongoose";
export const connectingToMongoDB = async () => {
  try {
    const mongoURI: string = 'mongodb://localhost:27017/jaksel-translate'
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
