import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log("Connected to DB");

    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);

    }
}

export { connectDB }