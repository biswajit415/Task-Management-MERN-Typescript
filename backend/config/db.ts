import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
  try {
    let conncetString=process.env.MONGO_URI as string
    const conn = await mongoose.connect(conncetString, {
      family:4
    });
    console.log("Mongodb connection is created")
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
};


export default connectDB;