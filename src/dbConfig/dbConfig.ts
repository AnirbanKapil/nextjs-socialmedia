import mongoose from "mongoose";

export async function connectDB () {
    try {
      await mongoose.connect(process.env.MONGO_URL!);
      
      const connection = mongoose.connection;   
      
      connection.on("connected",()=>{
        console.log("MongoDB connected successfully")
      });

      connection.on("error",(error)=>{
        console.log("Error while connecting error---", error)
        process.exit();
      });
      
    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
}