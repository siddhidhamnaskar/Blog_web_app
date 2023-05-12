const mongoose=require("mongoose");

const {Schema}=require("mongoose");

const postSchema=new Schema({
    Title:{type:"String",required:true },
    Summary:{type:"String",required:true},
    img:{data:Buffer,ContentType:String},
    Content:{type:"String",required:true},
    Author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})

const PostModel=mongoose.model("Post",postSchema)
module.exports=PostModel;

