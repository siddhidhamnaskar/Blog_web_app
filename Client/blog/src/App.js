import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Components/AppBar';
import Sidebar from './Components/Sidebar';
import CircularIndeterminate from './Components/Loader';
import MediaCard from './Components/Card';
import { useEffect } from 'react';
import { useState } from 'react';
import { base_url } from './Sevices/API';
import { store } from './Redux/store';
import {getData} from "./Redux/actions"
import { Box, Paper, Typography } from '@mui/material';

export default function App() {
  const [data ,setData]=useState([]);
  const [load,setLoad]=useState(true);

  store.subscribe(()=>{
    //  console.log(store.getState().data);
    setData(store.getState().data)
    setLoad(false)
  })

  useEffect(()=>{
    fetch(`${base_url}/blogs`)
    .then((res)=>res.json())
    .then((json)=>{store.dispatch(getData(json))})
    .catch((err)=>console.log("Error"));
  },[])

  return <>
    <ResponsiveAppBar />
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f2ef' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, maxWidth: 600 }}>
        <div id='Container'>
          {load ? <CircularIndeterminate/>:  <div id="feedcontainer">
            {data.map((elem)=>{
              return <MediaCard key={elem._id} {...elem}/>
            })}
          </div>}
        </div>
      </Box>
      {/* Right Sidebar Placeholder */}
      <Box sx={{ width: 300, p: 3, display: { xs: 'none', lg: 'block' } }}>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            News
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Placeholder for news and updates
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Today's Most Viewed Courses
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Placeholder for courses
          </Typography>
        </Paper>
      </Box>
    </Box>
  </>
}


