import { Paper, TextField, Typography ,Button} from "@mui/material";
import {Box} from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
export default function Signup(){
    // const [data,setData]=useState([]);
    const [userData, setUserData]=useState({Name:"",Email:"",Password:""});
    const  [disabled, setDisabled]=useState(true);

    const navigate=useNavigate();
    const register=()=>{
      try{
        fetch("https://blog-app-3ke4.onrender.com/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(userData)
        }).then ((res)=>{
          alert("Registration Successfull");
          navigate("/login");

        })
     
     
        
      }
      catch(err){
        alert("Registration Failed");
      }
     

    }

const handleInput=(e)=>{
    // e.preventDefault();
    setUserData({
       ...userData,
       [e.target.name]:e.target.value
})

}

useEffect(()=>{
  if(userData.Name.length>0 && userData.Email.length>0 && userData.Password.length>7)
  {
    setDisabled(false);
  }
},[userData])


const onsubmit=(e)=>{

  e.preventDefault();
  
  
  register();
  setUserData({Name:"",Email:"",Password:""});
  
  

}

   const formstyle={
   
     display:"flex",
     flexDirection:"column",
     width:"100%" ,
     height:"70vh", 
     alignItems:"center",
     justifyContent:"center",
    
     
    }

    const inputstyle={
        width:"90%",
        marginBottom:"30px"

    }
    const paperStyle={
        width:"360px",
        height:"500px",
        margin:"auto",
        marginTop:"50px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
        // border:"1px solid black",

    }

    return<>
       <ResponsiveAppBar />
       <Paper elevation={20} style={paperStyle}>
        <Typography align="center" style={{paddingTop:"50px",fontSize:"23px", fontWeight:"bold"}}>CREATE YOUR ACCOUNT</Typography>
             <form style={formstyle}>

                      
     <TextField
    required
    id="outlined-required"
    type="text"
    label="Name"
    name="Name"
    value={userData.Name}
    placeholder="Enter Your Name"
    onChange={handleInput}
    style={inputstyle} 
  />
          
     <TextField
    required
    id="outlined-required"
    type="email"
    label="Email"
    name="Email"
    value={userData.Email}
    placeholder="Enter Your Email"
    onChange={handleInput}
    style={inputstyle} 
  />
     <TextField
    required
    id="outlined-required"
    type="password"
    label="Password"
    name="Password"
    value={userData.Password}
    placeholder="Enter Your Password"
    onChange={handleInput}
    style={inputstyle} 
  />
     <Button variant="contained" disabled={disabled} onClick={onsubmit}>SUBMIT</Button>
  </form>
  </Paper>

    </>


}