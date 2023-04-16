import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Components/AppBar';
import MediaCard from './Components/Card';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [data ,setData]=useState([]);
    
  useEffect(()=>{
    fetch('https://blog-app-3ke4.onrender.com/blogs')
    .then((res)=>res.json())
    .then((json)=>setData(json))
    .catch((err)=>console.log("Error"));
  },[])



  return <>
    <ResponsiveAppBar />
    <div id="cardcontainer">
  
      {data.map((elem)=>{
      
         return <MediaCard key={elem._id} {...elem}/>
         

      })}
        
          
    
   
    </div>
   
  </>
}

export default App;
