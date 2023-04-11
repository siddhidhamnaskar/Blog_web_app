

const mongoose=require("mongoose");

const connection=async()=>{
   await mongoose.connect("mongodb+srv://siddhidh:m8mmQvZq!kLf.Wm@cluster0.99gdmwu.mongodb.net/?retryWrites=true&w=majority");
}

module.exports=connection;