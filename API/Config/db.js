const dotenv=require("dotenv");
dotenv.config();

const mongoose=require("mongoose");

const connection=async()=>{
   await mongoose.connect(process.env.MONGODB_URL);
}

module.exports=connection;