import * as React from 'react';
import { Link } from 'react-router-dom';
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
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/myBlogs">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="My Network" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Messaging" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/createpost">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Post" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/myBlogs">
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
