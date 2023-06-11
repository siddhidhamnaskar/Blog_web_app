import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';
import { useState,useEffect ,useContext} from 'react';
// import { UserContext } from './Usercontext';
// import { base_url } from '../Sevices/API';

export default function MediaCard({Title,Summary,Content,img,createdAt,updatedAt,Author,_id}) {
  
  const [image,setImage]=useState("")

  useEffect(()=>{
    const base64String = btoa(new Uint8Array(img.data.data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
  }, ''));

   setImage(base64String)

  },[])

 
  return (
    <Paper elevation={20} sx={{width:"360px",margin:"auto", marginTop:"30px" }} >
    <Card sx={{width:"360px",margin:"auto", marginTop:"0px" }} >
    
     <Link to={`/details/${_id}`}> <img src={`data:image/png;base64,${image}`} style={{width:"100%",height:"200px"}} alt=""></img></Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Title}
        </Typography>
        <Typography>
          <a href=''>{Author.Name}</a>
          <br/>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {Summary}
        </Typography>
      </CardContent>
      <CardActions>
        
       <Link to={`/details/${_id}`}><Button size="small">Learn More</Button></Link> 
      </CardActions>
    </Card>
    </Paper>
  );
}