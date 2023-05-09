import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Components/AppBar';
import CircularIndeterminate from './Components/Loader';
import MediaCard from './Components/Card';
import { useEffect } from 'react';
import { useState } from 'react';
import { base_url } from './Sevices/API';

function App() {
  const [data ,setData]=useState([]);
  const [load,setLoad]=useState(true);
    
  useEffect(()=>{
    fetch(`${base_url}/blogs`)
    .then((res)=>res.json())
    .then((json)=>{setData(json);setLoad(false)})
    .catch((err)=>console.log("Error"));
  },[])


  
  return <>
    <ResponsiveAppBar />
    <div id='Container'>

      {load ? <CircularIndeterminate/>:  <div id="cardcontainer">
     
  
     {data.map((elem)=>{
     
        return <MediaCard key={elem._id} {...elem}/>
        

     })}
       
         
   
  
   </div>}
    </div>
  
   
  </>
}

export default App;
