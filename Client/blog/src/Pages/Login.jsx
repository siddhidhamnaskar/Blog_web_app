
import { Paper, TextField, Typography, Button, Box, Container, Grid, Link as MuiLink, Avatar, InputAdornment, Alert, Snackbar } from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base_url } from "../Sevices/API";
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

export default function Login(){
  const [user, setUser]=useState({Email:"",Password:""});
  const  [disabled, setDisabled]=useState(true);
  const [load,setLoad]=useState(false);
  const navigate=useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(()=>{
    if(user.Email.length>0 && user.Password.length>7)
    {
      setDisabled(false);
    }
  }, [user])

  const handleInput=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }

  const login=(e)=>{
    e.preventDefault();
    setLoad(true);
     fetch(`${base_url}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user),

     })
     .then((res)=>{
       if (res.ok) {
         res.json().then((data)=>{
          localStorage.setItem('token',data);
          setLoad(false)
          setAlertMessage("Login Successful");
          setAlertSeverity('success');
          setAlertOpen(true);
          setTimeout(() => navigate("/"), 2000);
         })
       } else {
         res.json().then((errorData) => {
           setLoad(false)
           setAlertMessage(errorData.message || errorData || "Login Failed");
           setAlertSeverity('error');
           setAlertOpen(true);
         }).catch(() => {
           setLoad(false)
           setAlertMessage("Login Failed");
           setAlertSeverity('error');
           setAlertOpen(true);
         });
       }

     })
     .catch((err)=>{
      setLoad(false)
      setAlertMessage("Network Error: Login Failed");
      setAlertSeverity('error');
      setAlertOpen(true);
     })

  }

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar/>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={12}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 400,
              borderRadius: 3,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            }}
          >
            {load && <LinearProgress sx={{ width: '100%', mb: 2, borderRadius: 1 }} />}

            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
              <LoginIcon sx={{ fontSize: 30 }} />
            </Avatar>

            <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
              Welcome Back
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Sign in to your account to continue
            </Typography>

            <Box component="form" onSubmit={login} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                autoFocus
                value={user.Email}
                onChange={handleInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.Password}
                onChange={handleInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={disabled}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
                  },
                  '&:disabled': {
                    backgroundColor: 'grey.300',
                  },
                }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <MuiLink
                    component={Link}
                    to="/signup"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Don't have an account? Sign Up
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
