import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Navbar } from '../../conponents/Navbar/navbar';
import { Footer } from '../../conponents/Footer/footer';

export function NoPage() {
  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#080808',
    }}
    >
      <Box sx={{ display: 'flex', backgroundColor: '#080808' }}>
        <Navbar />
        <Typography variant="h1" component="div" color="white" sx={{ flexGrow: 1, paddingTop: '75px' }}>
          Oops! Page not found.
        </Typography>
      </Box>
      <Footer />
    </Box>
  );
}
