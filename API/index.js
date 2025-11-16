const express=require("express");

const connection=require("./Config/db")
const cors=require('cors');
const app=express();
const User=require("./models/user.js");
const Post=require("./models/post.js");
const Photos=require("./models/profile");
const bcrypt=require("bcryptjs");
const cookieParser=require("cookie-parser");
const bodyparser = require('body-parser');
const jwt=require("jsonwebtoken");
const multer=require('multer');
const streamifier=require("streamifier");



const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 3033;
const secret=process.env.SECRET;
const cloudinary=require("cloudinary");


 app.use(cors());
 app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json());


  //  app.use(cookieParser());


  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})

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
        jwt.sign({Name:user.Name,Email:user.Email,id:user._id},secret,{ expiresIn: "1h" },(err,token)=>{
            if(err) throw err;
           
            
            res.cookie('token',token).json(token)
        
        })
       }
       else{
         res.status(400).json("Incorrect Password");
       }

      
    
  
      }
      catch(err)
      {
        res.status(500).json(err);
   
      }
})

app.post('/profile',async(req,res)=>{
  try{
    let token=req.body.token;
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



const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/post" ,upload.single("file"),async(req,res)=>{

  try{
   
    
    const urls=[];
    console.log(req.body);
    const fileStr = req.file.buffer.toString("base64");
    let token=req.body.token;
   
     jwt.verify(token ,secret,{},async(err,info)=>{
      const response = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      { folder: "uploads" ,
        resource_type: "auto",
      } // optional folder
      );

      // console.log(response);

      // console.log(res.secure_url);
      urls.push(response.secure_url);
     
       const blog=new Post({
          Title:req.body.title,
          Summary:req.body.summary,
          img:urls[0],
          Content:req.body.content,
          Author:info.id
        })
        const post=await blog.save();
        console.log(post);
        res.status(200).json(post);

    })
   
   
  }
  catch(err){
    res.status(505).json(err);
  }
  }
 

)

app.post('/photo',upload.single('file'),async(req,res)=>{
  try{
    let token=req.body.token;
     const urls=[];
     const fileStr = req.file.buffer.toString("base64");
    //  console.log(req.body);
 
    jwt.verify(token ,secret,{},async(err,info)=>{
        if(err) throw err;
      
       const response = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      { folder: "uploads" ,
        resource_type: "auto",
      } // optional folder
      );

      // console.log(response);

      // console.log(res.secure_url);
      urls.push(response.secure_url);
        const photo=new Photos({
         
          img:response.secure_url,
      
          Author:info.id
        })
        const Photo=await photo.save();
        res.status(200).json(Photo);

    })

  }
  catch(err){
    console.log(err);
    res.status(505).json(err);

  }
  
})


app.get('/photo/',async(req,res)=>{
  try{
    //  console.log(req.query);
    const data=await Photos.findOne(req.query).sort({createdAt:-1}).limit(20);;
    // console.log(data);
    res.status(200).json(data);

  }
  catch(err){
    res.status(505).json(err);

  }

})



app.get("/blogs",async(req,res)=>{
  try{
    const blogData=await Post.find().populate('Author',['Name']).sort({createdAt:-1}).limit(20);
    res.status(200).json(blogData);

  }
  catch(err){
    res.status(505).json(err);
  }
 

})

app.get("/blogs/:id",async(req,res)=>{
  try{
    const blog=await Post.findById(req.params.id).populate('Author',['Name']);
    res.json(blog);

  }
  catch(err){
    res.status(505).json(err);
  }
})

app.delete("/blogs/:id",async(req,res)=>{
  try{
    const blog=await Post.findByIdAndDelete(req.params.id).populate('Author',['Name']);
    res.json(blog);
  }
  catch(err){
    res.status(505).json(err);
  }
})

app.put("/edit/:id",upload.single('file'),async(req,res)=>{
  try{
    const blog=await Post.findById(req.params.id).populate('Author',['Name']);
     blog.Title=req.body.title;
     blog.Summary=req.body.summary;
     blog.Content=req.body.content;
     if(req.file)
     {
      const {path}=req.file;
      const result=await cloudinary.uploader.upload(path)
     
      blog.img=result.secure_url

     }


     const post=await blog.save();
     res.status(200).json(post);


  }
  catch(err){

  }

})

app.get("/names/",async(req,res)=>{
  try{
    // console.log(1);
      console.log(req.query.Author);
    const blogData=await Post.find().populate('Author',['Name']).sort({createdAt:-1}).limit(20);
    //  console.log(blogData);
    const data=blogData.filter((elem)=>{
      return elem.Author.Name===req.query.Author
    })
    
    res.status(200).json(data);
  
  }
  catch(err){
    res.status(505).json(err);
  }

})

app.get("/myBlogs/",async(req,res)=>{
  try{
    //  console.log(req.query);
    const blogData=await Post.find(req.query).populate('Author',['Name']).sort({createdAt:-1}).limit(20);
    // console.log(blogData);
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

