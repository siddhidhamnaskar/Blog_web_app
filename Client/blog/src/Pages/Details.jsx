import { Paper,Typography } from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {formatISO9075} from "date-fns";
import { UserContext } from "../Components/Usercontext";
import { Link } from "react-router-dom";
import { base_url } from "../Sevices/API";
import CircularIndeterminate from "../Components/Loader";
export default function Details(){
    const {userInfo} =useContext(UserContext);
    const [elem,setElem]=useState("")
    const [image,setImage]=useState("")
  
  const {id} =useParams();

  const navigate=useNavigate();

//   console.log(userInfo, data);
  useEffect(()=>{
   

     fetch(`${base_url}/blogs/${id}`)
     .then((res)=>{
        res.json().then((json)=>{setElem(json);  const base64String = btoa(new Uint8Array(json.img.data.data).reduce(function (data, byte) {
         return data + String.fromCharCode(byte);
     }, ''));
   
     setImage(base64String)});
     })

     
 
    

  },[])


  const deletePost=()=>{
    fetch(`${base_url}/blogs/${id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json"
      }
      
    })
    .then((res)=>{
       return res.json();
    })
    .then((json)=>{
      console.log(json);
      alert("Post Deleted");
      navigate("/")
    })
    .catch((err)=>{
      console.log("Error")
    })
  }

   const print=()=>{
      console.log(elem);
   }
    
   const paperStyle={
      width:"70%",
    
      margin:"auto",
      marginTop:"30px",
      padding:"30px",
      marginBottom:"30px"
     

   }

     
    if(elem==="" ) {
      return <>
        <ResponsiveAppBar/>
        <CircularIndeterminate/>
      </>
    }

    return <>
    <ResponsiveAppBar/>
    <Paper elevation={20} style={paperStyle}>  
      <h1>{elem.Title}</h1>
      <p>{elem.Summary}</p>
      <Typography>
          <Link href=''>{elem.Author.Name}</Link>
          <br/>
          <time>{formatISO9075(new Date(elem.createdAt))}</time>
        </Typography>
       {
        userInfo && userInfo.id==elem.Author._id ?<div><Link to={`/edit/${id}`} style={{textAlign:"right"}}>Edit</Link> <br/> <IconButton aria-label="delete" size="large">
        <DeleteIcon onClick={deletePost} fontSize="inherit" />
      </IconButton></div> :null
       }
      
      <img src={`data:image/png;base64,${image}`} onClick={print} style={{width:"100%" ,height:"400px"}}></img>
      
      <h2>Content:</h2>
      <div dangerouslySetInnerHTML={{__html:elem.Content}}/>

    </Paper>

      

    </>
}