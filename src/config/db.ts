import env from "../environments/env";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongo_url!)
    console.log("Mongo DB connected successfully ")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export default connectDB