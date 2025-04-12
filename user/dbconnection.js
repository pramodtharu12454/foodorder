import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = `mongodb+srv://onlinebazar:online123@pramod.49wcu.mongodb.net/foodorder?retryWrites=true&w=majority&appName=pramod`;
    await mongoose.connect(url);
    console.log("connect database successful.....");
  } catch (error) {
    console.log("db connection failed....");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
