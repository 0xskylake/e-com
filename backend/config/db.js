import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline);
    process.exit();
  }
};

export default connectDB;