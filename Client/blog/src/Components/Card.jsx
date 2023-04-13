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

export default function MediaCard({Title,Summary,Content,Cover,createdAt,updatedAt,Author,_id}) {

 
  return (
    <Paper elevation={20} sx={{width:"360px",margin:"auto", marginTop:"30px" }} >
    <Card sx={{width:"360px",margin:"auto", marginTop:"0px" }} >
    
      <img src={`http://localhost:3046/${Cover}`} style={{width:"100%",height:"200px"}}></img>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Title}
        </Typography>
        <Typography>
          <a href=''>{Author.Name}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {Summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
       <Link to={`/details/${_id}`}><Button size="small">Learn More</Button></Link> 
      </CardActions>
    </Card>
    </Paper>
  );
}