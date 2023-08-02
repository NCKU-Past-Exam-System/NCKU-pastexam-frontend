import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
export const Navbar = ()=>{
  const navigation = useNavigate();
  return (

      <AppBar position="fixed"  color='' sx={{ margin:0,color:'darkgrey',zIndex: (theme)=>theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} >
          <Button onClick={() => {navigation(`/`)}} sx={{color:'black',margin:'10px',fontSize:'25px'}}>成大資工考古題系統</Button>
          </Typography>
          <Button onClick={() => {navigation(`/upload`)}} sx={{color:'darkgray',margin:'10px'}}>Upload</Button>
          <Button onClick={() => {navigation(`/login`)}} sx={{color:'darkgray'}}>Login</Button>
        </Toolbar>
      </AppBar>
  );
}