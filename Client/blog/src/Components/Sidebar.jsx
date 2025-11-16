import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from './Usercontext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077B5',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function Sidebar() {
  const { userInfo } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    if (!userInfo.Name) {
      navigate("/login");
    } else {
      navigate("/createpost");
    }
  };

  const handleMyBlogsClick = () => {
    if (!userInfo.Name) {
      navigate("/login");
    } else {
      navigate("/myBlogs");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 280,
          height: '100vh',
          backgroundColor: 'white',
          color: 'black',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
        }}
      >
       
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCreatePostClick}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Post" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleMyBlogsClick}>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="My Blogs" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;
