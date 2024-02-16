import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connect to ${conn.connection.host} in ${process.env.NODE_ENV} mode`)
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}


export default connectDB;