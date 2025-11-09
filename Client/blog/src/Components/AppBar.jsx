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
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Slide } from '@mui/material';

import FreeSolo from './search';

import { useEffect,useState } from 'react';
import { UserContext } from './Usercontext';

import { base_url } from '../Sevices/API';
import { store } from '../Redux/store';
import { saveImage } from '../Redux/actions';


const pages = ['CREATE A POST+'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#21CBF3',
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
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }} />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {userInfo.Name ? (
                    <>
                      <Link to="/createpost" style={{ fontSize: '15px', fontWeight: "bold", textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                        <AddIcon sx={{ mr: 1 }} />
                        CREATE NEW POST+
                      </Link>
                      <Link to="/myBlogs" style={{ fontSize: '15px', fontWeight: "bold", textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                        <BookIcon sx={{ mr: 1 }} />
                        MY BLOGS
                      </Link>
                    </>
                  ) : null}
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
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOG APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userInfo.Name ? (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Link to="/createpost" style={{ fontSize: '15px', fontWeight: "bold", textDecoration: "none", display: 'flex', alignItems: 'center', color: 'inherit' }}>
                    <AddIcon sx={{ mr: 1 }} />
                    CREATE NEW POST+
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Link to="/myBlogs" style={{ fontSize: '15px', fontWeight: "bold", textDecoration: "none", display: 'flex', alignItems: 'center', color: 'inherit' }}>
                    <BookIcon sx={{ mr: 1 }} />
                    MY BLOGS
                  </Link>
                </Button>
              </>
            ) : null}
          </Box>
          {userInfo.Name ? <FreeSolo/>:null}
          
        
          <Box sx={{ flexGrow: 0 }} >
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
