import { Paper,Typography } from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import { useParams } from "react-router-dom";
import { useContext, useEffect,useState } from "react";

import {formatISO9075} from "date-fns";
import { UserContext } from "../Components/Usercontext";
import { Link } from "react-router-dom";
export default function Details(){
    const {userInfo} =useContext(UserContext);
  
   const [data,setData]=useState("");
  const {id} =useParams();

//   console.log(userInfo, data);
  useEffect(()=>{

     fetch(`https://blog-app-3ke4.onrender.com/${id}`)
     .then((res)=>{
        res.json().then((json)=>{setData(json)});
     })
    

  },[])

   const print=()=>{
      console.log(data);
   }
    
   const paperStyle={
      width:"70%",
    
      margin:"auto",
      marginTop:"30px",
      padding:"30px",
      marginBottom:"30px"
     

   }
     
    if(data==="" ) {
      return <>
      </>
    }

    return <>
    <ResponsiveAppBar/>
    <Paper elevation={20} style={paperStyle}>  
      <h1>{data.Title}</h1>
      <p>{data.Summary}</p>
      <Typography>
          <Link href=''>{data.Author.Name}</Link>
          <time>{formatISO9075(new Date(data.createdAt))}</time>
        </Typography>
       {
        userInfo && userInfo.id==data.Author._id ? <Link to={`/edit/${id}`} style={{textAlign:"right"}}>Edit</Link>:null
       }
      
      <img onClick={print} src={`https://blog-app-3ke4.onrender.com/${data.Cover}`} style={{width:"100%" ,height:"400px"}}></img>
      
      <h2>Content:</h2>
      <div dangerouslySetInnerHTML={{__html:data.Content}}/>

    </Paper>

      

    </>
}