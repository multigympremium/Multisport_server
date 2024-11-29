import mongoose from "mongoose";
import colors from "colors"; // Import colors

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "multiSport" ,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if server is not available
      socketTimeoutMS: 120000,  
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.underline.green); // Use .underline from colors package
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
