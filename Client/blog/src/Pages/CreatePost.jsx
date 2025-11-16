import React from "react";
import { Paper, TextField, Typography, Avatar, Box, Button, IconButton, Divider } from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Components/Usercontext";
import { base_url } from "../Sevices/API";
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
export default function CreatePost(){
  const {userInfo,setUserInfo} =React.useContext(UserContext);
   const [title, setTitle]=useState("");
   const [summary ,setSummary]=useState("");
   const [content,setContent]=useState("");
   const [file,setFile]=useState("");
   const navigate=useNavigate();

   useEffect(() => {
     if (!userInfo.Name) {
       navigate('/login');
     }
   }, [userInfo, navigate]);
   const postData=(e)=>{
    e.preventDefault();
    let token=localStorage.getItem('token')||"";
    console.log(file);
      const data=new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('file',file);
      data.set('content',content);
      data.set('token',token);
  
      console.log(file);
      fetch(`${base_url}/post`,{
        method:"POST",
         body:data,
       

      })
      .then((res)=>{
        alert("Created Succesfully");
        navigate("/");
         
      })
      .catch((err)=>{
        alert("Please Enter Required Field");
      })
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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: '#0077B5' }}>
            {userInfo.Name ? userInfo.Name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Create a Post
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={postData}>
          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="What is your post about?"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Summary"
            name="summary"
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}
            placeholder="Brief summary of your post"
            variant="outlined"
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              onChange={(e)=>setFile(e.target.files[0])}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<ImageIcon />}
                sx={{ mr: 1, textTransform: 'none' }}
              >
                Add Image
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Selected: {file.name}
              </Typography>
            )}
          </Box>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Share your thoughts..."
            modules={modules}
            style={{ minHeight: '150px', marginBottom: '16px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
            {/* <Box>
              <IconButton color="primary">
                <ImageIcon />
              </IconButton>
              <IconButton color="primary">
                <VideoLibraryIcon />
              </IconButton>
              <IconButton color="primary">
                <EventIcon />
              </IconButton>
              <IconButton color="primary">
                <ArticleIcon />
              </IconButton>
            </Box> */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#0077B5',
                '&:hover': { bgcolor: '#005885' },
                textTransform: 'none',
                px: 3
              }}
            >
              Post
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
    </>
    
}