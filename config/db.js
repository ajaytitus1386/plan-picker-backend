import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("DB Connection successful!");
  } catch (error) {
    console.log(`Failed to connect to DB: ${error}`);
  }
};

export default InitiateMongoServer;
