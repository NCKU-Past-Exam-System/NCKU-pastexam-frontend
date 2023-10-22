import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { clientId } from "../../credential";
import { useGoogleLogin , googleLogout,GoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
export const Navbar = () => {
  const navigation = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pages = ['課程查詢', '上傳考古題', '我的考古題'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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
  <AppBar position="fixed" sx={{backgroundColor:'#212121'}}>
    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: '#212121',
          textDecoration: 'none',
        }}
      >
        <Button onClick={() => { navigation(`/`) }} sx={{ color: '#DDE6ED', margin: '10px', fontSize: '30px' }}>成功大學考古題系統</Button>
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },justifyContent:'space-between',alignContent:'center'}}>
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
              <Typography textAlign="center" sx={{fontSize:'20'}} >{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
        <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          // paddingTop:'10px',
          textDecoration: 'none',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        成功大學考古題系統
      </Typography>
      <Tooltip title="Open settings" >
        {sessionStorage.getItem('token')!= undefined &&           
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={JSON.parse(sessionStorage.getItem('info'))?.given_name} src={JSON.parse(sessionStorage.getItem('info'))?.picture} sx={{ width: 55, height: 55 }}/>
          </IconButton>}
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' ,fontSize: '20px' }}
          >
            {page}
          </Button>
        ))}
      </Box>

      <Box sx={{ flexGrow:0.5,display:{xs:'none',md:'flex'},justifyContent:'center',marginRight:'auto'}}>
        <Tooltip title="Open settings" >
        {sessionStorage.getItem('token')!= undefined &&           
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={JSON.parse(sessionStorage.getItem('info'))?.given_name} src={JSON.parse(sessionStorage.getItem('info'))?.picture} sx={{ width: 55, height: 55 }}/>
          </IconButton>}
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
</AppBar>
  );
}
