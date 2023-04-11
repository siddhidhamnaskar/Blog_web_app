import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Components/AppBar';
import MediaCard from './Components/Card';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  
    



  return <>
    <ResponsiveAppBar />
    <div id="cardcontainer">
    <MediaCard/>
    </div>
   
  </>
}

export default App;
