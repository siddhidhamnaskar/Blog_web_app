import { Paper, TextField, Typography, Button, Box, Container, Grid, Link as MuiLink, Avatar, InputAdornment, Alert, Snackbar } from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base_url } from "../Sevices/API";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
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

export default function Signup(){
    const [userData, setUserData]=useState({Name:"",Email:"",Password:""});
    const [disabled, setDisabled]=useState(true);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const navigate=useNavigate();

    const register=()=>{
      fetch(`${base_url}/signup`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
      }).then ((res)=>{
        if (res.ok) {
          setAlertMessage("Registration Successful");
          setAlertSeverity('success');
          setAlertOpen(true);
          setTimeout(() => navigate("/login"), 2000);
        } else {
          res.json().then((errorData) => {
            setAlertMessage(errorData.message || errorData || "Registration Failed");
            setAlertSeverity('error');
            setAlertOpen(true);
          }).catch(() => {
            setAlertMessage("Registration Failed");
            setAlertSeverity('error');
            setAlertOpen(true);
          });
        }
      })
      .catch(err=>{
        setAlertMessage("Network Error: Registration Failed");
        setAlertSeverity('error');
        setAlertOpen(true);
      })
    }

    const handleInput=(e)=>{
        setUserData({
           ...userData,
           [e.target.name]:e.target.value
        })
    }

    useEffect(()=>{
      if(userData.Name.length>0 && userData.Email.length>0 && userData.Password.length>7)
      {
        setDisabled(false);
      }
    },[userData])

    const onsubmit=(e)=>{
      e.preventDefault();
      register();
      setUserData({Name:"",Email:"",Password:""});
    }

    return (
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
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
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
                <PersonAddIcon sx={{ fontSize: 30 }} />
              </Avatar>

              <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                Join Us Today
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                Create your account to start sharing your thoughts
              </Typography>

              <Box component="form" onSubmit={onsubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="Name"
                  autoComplete="name"
                  autoFocus
                  value={userData.Name}
                  onChange={handleInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
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
                  id="email"
                  label="Email Address"
                  name="Email"
                  autoComplete="email"
                  value={userData.Email}
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
                  autoComplete="new-password"
                  value={userData.Password}
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
                  Create Account
                </Button>

                <Grid container justifyContent="center">
                  <Grid item>
                    <MuiLink
                      component={Link}
                      to="/login"
                      variant="body2"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Already have an account? Sign In
                    </MuiLink>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
          <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    );
}
