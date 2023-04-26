
import { Paper, TextField, Typography ,Button} from "@mui/material";
// import {Box} from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../Sevices/API";
export default function Login(){
  const [user, setUser]=useState({Email:"",Password:""});
  const  [disabled, setDisabled]=useState(true);

  const navigate=useNavigate();
  useEffect(()=>{
    if(user.Email.length>0 && user.Password.length>7)
    {
      setDisabled(false);
    }

  })

  const handleInput=(e)=>{
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

  const login=(e)=>{
    e.preventDefault();
     fetch(`${base_url}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user),
      credentials:`include`
     })
     .then((res)=>{
       res.json().then((data)=>{
        localStorage.setItem('token',data);
        alert("Login Successfull");
      navigate("/");
       })
      
     })
     .catch((err)=>{
      alert("Login Failed");
     })

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
       <ResponsiveAppBar/>
       <Paper elevation={20} style={paperStyle}>
        <Typography align="center" style={{paddingTop:"50px",fontSize:"23px", fontWeight:"bold"}}>LOGIN</Typography>
             <form style={formstyle}>

                      
     
          
     <TextField
    required
    id="outlined-required"
    type="email"
    label="Email"
    name="Email"
    value={user.Email}
    onChange={handleInput}
    placeholder="Enter Your Email"
    style={inputstyle} 
  />
     <TextField
    required
    id="outlined-required"
    type="password"
    label="Password"
    name="Password"
    value={user.Password}
    onChange={handleInput}
    placeholder="Enter Your Password"
    style={inputstyle} 
  />
     <Button variant="contained" disabled={disabled} onClick={login}>LOGIN</Button>
  </form>
  </Paper>

    </>


}