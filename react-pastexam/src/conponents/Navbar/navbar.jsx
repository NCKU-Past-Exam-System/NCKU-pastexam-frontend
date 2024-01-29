import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { clientId } from "../../credential";
import { Link } from 'react-router-dom';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useGoogleLogin, googleLogout, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ConnectedTvOutlined } from '@mui/icons-material';
export const Navbar = () => {
  const navigation = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pages = ['課程查詢', '我的考古題'];
  const pagelinks = ['search', 'mine'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const settinglinks = ['tmp', 'tmp', 'tmp', 'tmp'];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (index) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (index) => {
    navigation(`/${settinglinks[index]}`);
    setAnchorElUser(null);
  };

  const googleOathLogin = <GoogleLogin
    theme="filled_black"
    clientId={clientId}
    onSuccess={async (tokenResponse) => {
      sessionStorage.setItem('token', tokenResponse.credential);
      sessionStorage.setItem('info', JSON.stringify(jwtDecode(tokenResponse.credential)));
      window.location.reload();
    }}
    onError={(error) => {
      alert('Login failed');
      console.log(error);
    }}
  />

  const googleOathLoginMobile = <GoogleLogin
    type='icon'
    logo_alignment='center'
    clientId={clientId}
    onSuccess={async (tokenResponse) => {
      sessionStorage.setItem('token', tokenResponse.credential);
      sessionStorage.setItem('info', JSON.stringify(jwtDecode(tokenResponse.credential)));
      window.location.reload();
    }}
    onError={(error) => {
      alert('Login failed');
      console.log(error);
    }}
  />
  
  const googleOathLogout = () => {
    googleLogout();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('info');
    window.location.reload();
  }
  
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#212121' }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        {/*for desktop*/}
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
        <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, index) => (
            <Button
              key={page}
              onClick={() => { navigation(`/${pagelinks[index]}`); }}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '20px' }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Tooltip sx={{ pl: 2, display: { xs: 'none', md: 'flex' } }}>
          {sessionStorage.getItem('token') != undefined ?
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
              <Avatar alt={JSON.parse(sessionStorage.getItem('info'))?.given_name} src={JSON.parse(sessionStorage.getItem('info'))?.picture} sx={{ width: 55, height: 55 }} />
            </IconButton>
            : <Button>{googleOathLogin}</Button>
          }
        </Tooltip>
        <Box sx={{ flexGrow: 0.5, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', marginRight: 'auto' }}>

          <Menu
            anchorEl={anchorElUser}
            id="account-menu"
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => { handleCloseNavMenu(); navigation('/tmp'); }}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={() => { handleCloseNavMenu(); navigation('/tmp'); }}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleCloseNavMenu(); navigation('/tmp'); }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => { handleCloseNavMenu(); googleOathLogout(); }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

        </Box>
        {/*for mobile*/}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignContent: 'center' }}>
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
              <MenuItem key={page} >
                <Typography textAlign="center" sx={{ fontSize: '20' }} >{page}</Typography>
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
              textDecoration: 'none',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            成功大學考古題系統
          </Typography>
          <Tooltip sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            {sessionStorage.getItem('token') != undefined ?
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: { xs: 'flex', md: 'none' } }}>
                <Avatar alt={JSON.parse(sessionStorage.getItem('info'))?.given_name} src={JSON.parse(sessionStorage.getItem('info'))?.picture} sx={{ width: 35, height: 35 }} />
              </IconButton>
              : <Button sx={{ pt: 2, display: { xs: 'flex', md: 'none' } }}>{googleOathLoginMobile}</Button>
            }
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
