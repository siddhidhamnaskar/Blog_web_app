const mongoose=require("mongoose");

const {Schema}=require("mongoose");

const profileSchema=new Schema({
  
    img:{type:"String",required:true},
    Author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})

const ProfileModel=mongoose.model("Profile",profileSchema)
module.exports=ProfileModel;
