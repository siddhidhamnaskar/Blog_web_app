const express=require("express");

const connection=require("./Config/db")
const cors=require('cors');
const app=express();
const User=require("./models/user.js");
const bcrypt=require("bcryptjs");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const secret="ncohcfueihmscnkjfowrjodwdmnxsm";
const PORT=3046;
app.use(cors({credentials:true,origin:"http://localhost:3001"}));
app.use(express.json());
app.use(cookieParser());

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
   const {token}=req.cookies;
    jwt.verify(token ,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);

    })

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