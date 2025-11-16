import { base_url } from "../Sevices/API";
import { useState,useEffect,useContext } from "react";
import { UserContext } from "../Components/Usercontext";
import ResponsiveAppBar from "../Components/AppBar";
import MediaCard from "../Components/Card";
import CircularIndeterminate from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

export default function MyBlog(){
    const {userInfo,setUserInfo,image,setImage} =useContext(UserContext);
    const [data,setData]=useState([]);
    const [load,setLoad]=useState(false);
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    useEffect(() => {
      if (!userInfo.Name) {
        navigate("/login");
      }
    }, [userInfo, navigate]);

    useEffect(()=>{
        var token=localStorage.getItem('token')||"";

        fetch(`${base_url}/profile`,{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({'token':token}),
         
       
           })
           .then((res)=>{
              res.json().then((info)=>{
                 
               setUserInfo(info);
               fetch(`${base_url}/myBlogs/?Author=${info.id}`)
               .then((res)=>{
                 return res.json();

                 })
                 .then((json)=>{
                    // console.log(json)
                   setData(json)
                 })
                })
           })
           
          

    },[])

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    const handleDeleteClick = (post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!postToDelete) return;

        try {
            const response = await fetch(`${base_url}/blogs/${postToDelete._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setData(data.filter(post => post._id !== postToDelete._id));
                setDeleteDialogOpen(false);
                setPostToDelete(null);
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setPostToDelete(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveAppBar/>

            <h1 style={{textAlign:"center"}}>My Blogs</h1>

            {load ? <CircularIndeterminate/>:  <div id="blogcontainer">
                {data.map((elem)=>{
                    return (
                        <Box key={elem._id} sx={{ position: 'relative', mb: 2 }}>
                            <Box sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 1,
                                display: 'flex',
                                gap: 1
                            }}>
                                <IconButton
                                    onClick={() => handleEdit(elem._id)}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                    size="small"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDeleteClick(elem)}
                                    sx={{
                                        bgcolor: 'error.main',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'error.dark' }
                                    }}
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <MediaCard {...elem}/>
                        </Box>
                    );
                })}
            </div>}

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Blog Post"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete "{postToDelete?.Title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
