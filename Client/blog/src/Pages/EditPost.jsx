import React, { useEffect } from "react";
import { Paper, TextField, Typography, Button, Box, Container, Grid, Link as MuiLink, Avatar, InputAdornment, Alert, Snackbar } from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Components/Usercontext";
import { base_url } from "../Sevices/API";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#21CBF3',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function EditPost(){
    const {id}=useParams();
  const {userInfo,setUserInfo} =React.useContext(UserContext);
   const [title, setTitle]=useState("");
   const [summary ,setSummary]=useState("");
   const [content,setContent]=useState("");
   const [file,setFile]=useState("");
   const navigate=useNavigate();
   const [alertOpen, setAlertOpen] = useState(false);
   const [alertMessage, setAlertMessage] = useState('');
   const [alertSeverity, setAlertSeverity] = useState('success');

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
        

      })
      .then((res)=>{
        setAlertMessage("Updated Successfully");
        setAlertSeverity('success');
        setAlertOpen(true);
        setTimeout(() => navigate("/"), 2000);

      })
      .catch((err)=>{
        setAlertMessage("Please Enter Required Field");
        setAlertSeverity('error');
        setAlertOpen(true);
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

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveAppBar />
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        elevation={12}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 600,
                            borderRadius: 3,
                            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
                            <EditIcon sx={{ fontSize: 30 }} />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                            Edit Your Post
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            Update your blog post content
                        </Typography>

                        <Box component="form" onSubmit={updateData} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Post Title"
                                name="title"
                                value={title}
                                autoFocus
                                onChange={(e)=>setTitle(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TitleIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="summary"
                                label="Post Summary"
                                name="summary"
                                value={summary}
                                onChange={(e)=>setSummary(e.target.value)}
                                multiline
                                rows={3}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="file"
                                type="file"
                                name="file"
                                onChange={(e)=>setFile(e.target.files)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CloudUploadIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                                helperText="Leave empty to keep current image"
                            />

                            <Box sx={{ mt: 3, mb: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                                    Content
                                </Typography>
                                <ReactQuill
                                    value={content}
                                    onChange={newValue=>setContent(newValue)}
                                    modules={modules}
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        minHeight: '200px'
                                    }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
                                    },
                                }}
                            >
                                Update Post
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
