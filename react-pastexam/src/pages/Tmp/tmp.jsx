import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import {Footer} from "../../conponents/Footer/footer";
import { Typography } from "@mui/material";
export const Tmp = () => {
    return (
      <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column' ,backgroundColor:'#080808'}}>
      <Box sx={{ display: 'flex' ,backgroundColor:'#080808'}} >
          <Navbar />
          <Typography variant="h1" component="div" color={"white"} sx={{ flexGrow: 1 ,paddingTop:'75px'}}>
            It's a temporary page.
          </Typography>
      </Box>
      <Footer />
  </Box>
    )
  };