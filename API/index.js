const express=require("express");

const connection=require("./Config/db")
const cors=require('cors');
const app=express();
const User=require("./models/user.js");
const Post=require("./models/post.js")
const bcrypt=require("bcryptjs");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const secret="ncohcfueihmscnkjfowrjodwdmnxsm";
const multer=require('multer');
const uploadMiddelwares=multer({dest:'uploads/'})
const PORT=3046;
const fs =require('fs');
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

// console.log(process.env.PORT);
app.post("/signup",async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(8);
        const hashPass=await bcrypt.hash(req.body.Password,salt);
        const newUser=new User({
          Name:req.body.Name,
          Email:req.body.Email,
          Password:hashPass
          
  
            
        });
        const user= await newUser.save();
        // console.log(user);
        res.status(200).json(user);
  
     }
     catch(err){
      res.status(500).json(err);
        
     }
  
   
})

app.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({Email:req.body.Email});
    
        !user && res.status(400).json("Wrong Credintials");
    
        const validate=await bcrypt.compare(req.body.Password,user.Password);

       if(validate)
       {
        jwt.sign({Name:user.Name,Email:user.Email,id:user._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json('ok');
        })
       }
       else{
         res.status(400).json("Incorrect Password");
       }

      
    
    //    const {Password, ...other}=user._doc;
   
    //    res.status(200).json(other);
    
      }
      catch(err)
      {
        res.status(500).json(err);
   
      }
})

app.get('/profile',async(req,res)=>{
  try{
    const {token}=req.cookies;
    jwt.verify(token ,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);

    })
  }
  catch(err){
    res.status(500).json(err);
  }
   

})

app.post("/logout",async(req,res)=>{
   res.cookie('token'," ").json("ok");
})


app.post("/post",uploadMiddelwares.single('file') ,async(req,res)=>{

  try{
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+"."+ext;
    fs.renameSync(path,newPath);

    const {token}=req.cookies;
    jwt.verify(token ,secret,{},async(err,info)=>{
        if(err) throw err;
        const blog=new Post({
          Title:req.body.title,
          Summary:req.body.summary,
          Cover:newPath,
          Content:req.body.content,
          Author:info.id
        })
        const post=await blog.save();
        res.status(200).json(post);

    })
   
   
  }
  catch(err){
    res.status(505).json(err);
  }
  }
 

)

app.get("/blogs",async(req,res)=>{
  try{
    const blogData=await Post.find().populate('Author',['Name']).sort({createdAt:-1}).limit(20);
    res.status(200).json(blogData);

  }
  catch(err){
    res.status(505).json(err);
  }
 

})

app.listen(PORT,()=>{
    try{
    connection();
     console.log(`Server is running on ${PORT}`);

    }
    catch(err){
        console.log("Error");
    }
});