import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { clientId } from "../../credential";
import { useGoogleLogin , googleLogout,GoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
export const Navbar = () => {
  const navigation = useNavigate();
  const googleOathLogin = GoogleLogin({
    theme :'filled_black',
    clientId: clientId,
    onSuccess: async (tokenResponse) => {
      sessionStorage.setItem('token', tokenResponse.credential);
      sessionStorage.setItem('info', JSON.stringify(jwtDecode(tokenResponse.credential)));
      window.location.reload();
    },
    onError: (error) => {
      alert('Login failed');
      console.log(error);
    }
  })
  const googleOathLogout = () => {
    googleLogout();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('info');
    window.location.reload();
  }
  return (
    <AppBar position="fixed" color='default' sx={{  margin: 0,borderRadius:'2px', backgroundColor: '#526D82', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
          <Button onClick={() => { navigation(`/`) }} sx={{ color: '#DDE6ED', margin: '10px', fontSize: '25px' }}>成大資工考古題系統</Button>
        </Typography>
        <Button onClick={() => { navigation(`/upload`) }} sx={{ color: '#DDE6ED', margin: '10px' }}>Upload</Button>
        {sessionStorage.getItem('token')!=undefined && <Typography color={"#DDE6ED"} paddingRight={"10px"}>Hi, {JSON.parse(sessionStorage.getItem('info'))?.given_name}</Typography>}
        {sessionStorage.getItem('token')==undefined ? <Button>{googleOathLogin}</Button> : <Button onClick={googleOathLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}
