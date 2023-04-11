const mongoose=require("mongoose");

const {Schema}=require("mongoose");

const userSchema=new Schema({
    Name:{type:"String",required:true ,min:10},
    Email:{type:"String",required:true},
    Password:{type:"String",required:true}
})

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel;