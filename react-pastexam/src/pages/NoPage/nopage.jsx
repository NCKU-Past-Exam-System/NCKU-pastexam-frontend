import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import {Footer} from "../../conponents/Footer/footer";
import { Typography } from "@mui/material";
export const NoPage = () => {
    return (
      <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column' ,backgroundColor:'#040D12'}}>
      <Box sx={{ display: 'flex' ,backgroundColor:'#040D12'}} >
          <Navbar />
          <Sidebar />
          <Typography variant="h1" component="div" color={"white"} sx={{ flexGrow: 1 ,paddingTop:'75px'}}>
            Oops! Page not found.
          </Typography>
      </Box>
      <Footer />
  </Box>
    )
  };