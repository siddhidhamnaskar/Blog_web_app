import { Paper,Typography, Alert, Snackbar } from "@mui/material";
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
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

  const {id} =useParams();

  const navigate=useNavigate();

//   console.log(userInfo, data);
  useEffect(()=>{
   

     fetch(`${base_url}/blogs/${id}`)
     .then((res)=>{
        res.json().then((json)=>{setElem(json)});
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
      setAlertMessage("Post Deleted Successfully");
      setAlertSeverity('success');
      setAlertOpen(true);
      setTimeout(() => navigate("/"), 2000);
    })
    .catch((err)=>{
      setAlertMessage("Failed to Delete Post");
      setAlertSeverity('error');
      setAlertOpen(true);
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
      
      <img src={`${elem.img}`} onClick={print} style={{width:"100%" ,height:"400px"}}></img>
      
      <h2>Content:</h2>
      <div dangerouslySetInnerHTML={{__html:elem.Content}}/>

    </Paper>
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
      <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>

    </>
}
