import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import FreeSolo from './search';

import { useEffect,useState } from 'react';
import { UserContext } from './Usercontext';

import { base_url } from '../Sevices/API';
import { store } from '../Redux/store';
import { saveImage } from '../Redux/actions';


const pages = ['CREATE A POST+'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];




function ResponsiveAppBar() {
  const {userInfo,setUserInfo,image,setImage} =React.useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [photo, setPhoto]=React.useState(null)
  
 
  const navigate=useNavigate();

  // store.subscribe(()=>{
  //    console.log(store.getState());
  //   setPhoto(store.getState().image);
  // })
  
  

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
         fetch(`${base_url}/photo/?Author=${info.id}`)
         .then((res)=>{
           return res.json();
         })
         .then((json)=>{
        
          const base64String = btoa(new Uint8Array(json.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
      
           setPhoto(base64String);
           setImage(base64String);
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

   

    const logout=()=>{
      fetch(`${base_url}/logout`,{
       
        method:'POST',
      })
      localStorage.setItem('token',"");
    
      setUserInfo({Email:"",Name:"",id:""});
       navigate("/login")

    }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{backgroundColor:"white",color:"black"}}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           BLOG APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {userInfo.Name?   <Link to="/createpost" style={{fontSize:'15px',fontWeight:"bold",textDecoration:"none"}}>CREATE NEW POST+</Link> :null}
                  {userInfo.Name?   <Link to="/myBlogs" style={{fontSize:'15px',fontWeight:"bold",textDecoration:"none"}}>MY BLOGS</Link> :null}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOG APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                  {userInfo.Name ?   <Link to="/createpost" style={{marginRight:"30px",fontSize:'15px',fontWeight:"bold",textDecoration:"none"}}>CREATE NEW POST+</Link> :null}
                  {userInfo.Name?   <Link to="/myBlogs" style={{fontSize:'15px',fontWeight:"bold",textDecoration:"none"}}>MY BLOGS</Link> :null}
              </Button>
            ))}
          </Box>
          {userInfo.Name ? <FreeSolo/>:null}
          
        
          <Box sx={{ flexGrow: 0 }} >
             {!userInfo.Name ? <>
            <Link to="/login" style={{fontSize:"15px", fontWeight:"bold",textDecoration:"none",marginRight:"30px"}} >Login</Link>   
         
            <Link to="/signup" style={{fontSize:"15px", fontWeight:"bold",textDecoration:"none"}}>Register</Link>
              
            </>:<> 
          
            <Tooltip title="Open settings" style={{marginLeft:"30px"}}>
          
            
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={`data:image/png;base64,${photo}`}   sx={{ width: 50, height: 50 }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
         
            <MenuItem onClick={handleCloseUserMenu} style={{display:"flex" ,flexDirection:"column"}}>
             <Link to={"/profile"}> <Typography key="Profile" textAlign="center">Profile</Typography></Link>
              <br/>
              <Typography key="Logout" textAlign="center" onClick={logout}>Logout</Typography>
           
            </MenuItem>
          
        </Menu>
            </>}
          
     
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;