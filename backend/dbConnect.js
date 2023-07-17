import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.log('MongoDB connection FAIL');
        process.exit(1);
    }
}
