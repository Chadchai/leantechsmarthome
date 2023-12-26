import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import { green } from '@mui/material/colors';

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.leantechsystems.com/">
        LeanTechSmartSystem
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

 

  const baseURL = "https://leantechsmarthome-0db22cab28f1.herokuapp.com/checkuser";
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [alert, setAlert] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  let navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append username and password
   const data = new FormData();
   data.append('user_name',username);
   data.append('user_pwd',password);
   console.log( data);
   setIsLoading(true);
   
   axios({
     method: "post",
     url: baseURL,
     data: data,
     headers: { 'content-type': 'multipart/form-data'  },
   })
     .then((response) => { 
      if (response.data.token !== 'Incorrect'){
        localStorage.setItem("mytoken", response.data.token);
        localStorage.setItem("username", response.data.user_name);
       setIsLoading(false);
       
       return navigate('/');
      } else {
       setAlert(response.data.token);
      }
     });
  };


  return (

      <Container component="main" maxWidth="xs" sx={{backgroundColor:'white',borderRadius:'25px'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Avatar sx={{ m: 1, bgcolor: green[500],width: 56, height: 56  }}>
            <CameraIndoorIcon fontSize='large' />
          </Avatar>
          <Typography component="h1" variant="h4" color={'black'} sx={{fontWeight:'bold'}}>
            Smart Guest House Application
          </Typography>
       
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {alert? 
              <Typography component="h6" variant="h7" style={{color:'red'}}>
             !! username หรือ password ไม่ถูกต้อง !!
            </Typography>
             : null}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
     
            />
            
            <FormControlLabel
              align="left"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{color:'black'}}
            />
            <Button
            type='submit'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1,fontSize:'20px' }}
              size="large"
      
            >
              เข้าสู่ระบบ
            </Button>
            <Grid container  sx={{ mb: 3, color:'black' }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ลืมรหัสผ่าน?
                </Link>
              </Grid>

            </Grid>
       
          </Box>
        </Box>

      </Container>

  );
}