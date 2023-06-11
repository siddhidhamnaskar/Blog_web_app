import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Fab from '@mui/material/Fab';

import EditIcon from '@mui/icons-material/Edit';

import { AppBar, Paper } from '@mui/material';
import { base_url } from '../Sevices/API';
import { UserContext } from '../Components/Usercontext';
import ResponsiveAppBar from '../Components/AppBar';


export default function Profile() {
   const {userInfo,setUserInfo,image,setImage} =React.useContext(UserContext);
  const [file,setFile]=useState("");
  const [photo, setPhoto]=React.useState(null);
  

  const hiddenFileInput = React.useRef(null);


  React.useEffect(()=>{
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
        fetch(`${base_url}/photo/?Author=${info.id}`)
        .then((res)=>{
          return res.json();
        })
        .then((json)=>{
       
         const base64String = btoa(new Uint8Array(json.img.data.data).reduce(function (data, byte) {
           return data + String.fromCharCode(byte);
       }, ''));
     
          setPhoto(base64String);
          
        })
        .catch((err)=>{
         console.log("Error");
        
        })
       
      
      
      })
      .catch((err)=>{
       setUserInfo({Email:"",Name:"",id:""});
       console.log("Error");
      })
    })

  },[])

  const handleClick=()=>{
    hiddenFileInput.current.click();
  }

  const handleChange=(e)=>{
    setPhoto(null)
    setImage(URL.createObjectURL(e.target.files[0]));
     setFile(e.target.files)
  }

  const postImage=()=>{
    let token=localStorage.getItem('token')||"";
    const data=new FormData();
  
    data.set('file',file[0]);
    
    data.set('token',token);

    // console.log(token);
    fetch(`${base_url}/photo`,{
      method:"POST",
       body:data,
     

    })
    .then((res)=>{
      alert("Successfully Updated");
     
       
    })
    .catch((err)=>{
      console.log('error');
    })
  }

  return <> 

  <ResponsiveAppBar/>
   
    <div className='profileContainer' direction="row" spacing={2}>
        <Paper className='profilePaper' elevation={20}>
          <div>
      {photo ?  <Avatar alt="Remy Sharp" src={`data:image/png;base64,${photo}`}   sx={{ width: 300, height: 300 }} />: <Avatar alt="Remy Sharp" src={image}   sx={{ width: 300, height: 300 }} />} 
      <Fab className='editIcon'  onClick={handleClick} color="secondary" aria-label="edit">
        <EditIcon  />
     
      </Fab>
      <input type='file'  ref={hiddenFileInput}
        onChange={handleChange}
       style={{display:"none"}} ></input>
        </div>
        <Button variant="contained" onClick={postImage}>Save</Button>
        </Paper>
        
    
    </div>
    </>
}