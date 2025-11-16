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
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Slide } from '@mui/material';

import FreeSolo from './search';

import { useEffect,useState } from 'react';
import { UserContext } from './Usercontext';

import { base_url } from '../Sevices/API';
import { store } from '../Redux/store';
import { saveImage } from '../Redux/actions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077B5', // LinkedIn blue
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

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
    <ThemeProvider theme={theme}>
      <AppBar position="static" elevation={4} sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <LinkedInIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': { color: '#E3F2FD' },
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/" style={{ fontSize: '15px', fontWeight: "bold", textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ mr: 1 }} />
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/myBlogs" style={{ fontSize: '15px', fontWeight: "bold", textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon sx={{ mr: 1 }} />
                  My Blogs
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOG APP
          </Typography>

          {/* LinkedIn-style navigation icons */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <IconButton color="inherit" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/myBlogs">
              <PeopleIcon />
            </IconButton>
            <IconButton color="inherit">
              <WorkIcon />
            </IconButton>
            <IconButton color="inherit">
              <MessageIcon />
            </IconButton>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Box> */}

          {userInfo.Name ? <FreeSolo/>:null}
          
        
          <Box sx={{ flexGrow: 1,display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }} >
             {!userInfo.Name ? <>
            <Link to="/login" style={{fontSize:"15px", fontWeight:"bold",textDecoration:"none",marginRight:"30px",color: 'inherit'}} >Login</Link>   
         
            <Link to="/signup" style={{fontSize:"15px", fontWeight:"bold",textDecoration:"none",color: 'inherit'}}>Register</Link>
              
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
         
            <MenuItem onClick={handleCloseUserMenu}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography textAlign="center">Profile</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={logout} style={{ display: 'flex', alignItems: 'center' }}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </Typography>
            </MenuItem>
          
        </Menu>
            </>}
          
     
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
