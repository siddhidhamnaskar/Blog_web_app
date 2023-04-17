import React, { useEffect } from "react";
import { Paper, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Components/Usercontext";
import { base_url } from "../Sevices/API";
export default function EditPost(){
    const {id}=useParams();
  const {userInfo,setUserInfo} =React.useContext(UserContext);
   const [title, setTitle]=useState("");
   const [summary ,setSummary]=useState("");
   const [content,setContent]=useState("");
   const [file,setFile]=useState("");
   const navigate=useNavigate();

   useEffect(()=>{

    fetch(`${base_url}/blogs/${id}`)
    .then((res)=>{
       res.json().then((json)=>{
        console.log(json.Title);
        setTitle(json.Title);
        setSummary(json.Summary);
        setContent(json.Content)
       });
    })
   

 },[])


   const updateData=(e)=>{
    e.preventDefault();
      const data=new FormData();
      data.set('title',title);
      data.set('summary',summary);
    
      data.set('content',content);
      if(file[0])
      {
        data.set('file',file[0]);
      }
  
      console.log(file[0]);
      fetch(`${base_url}/edit/${id}`,{
        method:"Put",
         body:data,
         credentials:'include'

      })
      .then((res)=>{
        alert("Created Succesfully");
        navigate("/");
         
      })
      .catch((err)=>{
        alert("Please Enter Required Field");
      })
   }
    const inputstyle={
      
        width:"90%",
        margin:"auto",
        height:"10px",
        marginTop:"40px",
        marginBottom:"40px"
      

    }
    const paperStyle={
        width:"90%",
        height:"550px",
        margin:"auto",
        marginTop:"30px",
        display:"flex",
        alignItems:"center",
        justifiedContent:"center",
        textAlign:"center"

    }
    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link'],
          ['clean'],
        ],
      };

    return <>
    <ResponsiveAppBar/>
    <Paper elevation={20} style={paperStyle}>
        <form style={{width:"100%",height:"100%"}} onSubmit={updateData}>
            <Typography style={{fontSize:"30px",fontWeight:"bold",marginTop:"20px"}}>EDIT A POST</Typography>
            <TextField
   
    id="outlined-required"
    type="title"
    label="Title"
    name="title"
    value={title}
    autoFocus
    onChange={(e)=>setTitle(e.target.value)}
    placeholder="Title"
    style={inputstyle} 
  />
         <TextField
  
    id="outlined-required"
    type="summary"
    label="Summary"
    name="summary"
    value={summary}
    onChange={(e)=>setSummary(e.target.value)}
    placeholder="Summary"
    style={inputstyle} 
  />
         <TextField
   
    id="outlined-required"
    type="file"
    name="file"
   
    onChange={(e)=>setFile(e.target.files)}
   
 
    style={inputstyle} 
  />
          <ReactQuill value={content} onChange={newValue=>setContent(newValue)} style={{width:"90%",margin:"auto",marginTop:"30px"}} modules={modules}/>
          <button  style={{width:"90%",margin:"auto",backgroundColor:"grey",height:"50px",marginTop:"20px",color:"white",fontSize:"30px"}}>SUBMIT</button>
        </form>
    </Paper>


    </>
    
}