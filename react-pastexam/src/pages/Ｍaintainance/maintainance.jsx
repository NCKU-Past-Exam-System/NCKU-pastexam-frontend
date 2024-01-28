import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import {Footer} from "../../conponents/Footer/footer";
import { Typography } from "@mui/material";
export const Maintainance = () => {
    return (
      <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column' ,backgroundColor:'#080808'}}>
      <Box sx={{ display: 'flex' ,justifyContent: 'center',width:'100%',backgroundColor:'#080808'}} >
          <Navbar />
          <Box
                        component="img"
                        sx={{display: 'block',
                            paddingTop:'75px',
                            margin: 'auto'}}
                        src="https://i.imgur.com/1aAEnnj.jpg"/>
      </Box>
      <Footer />
  </Box>
    )
    
  };