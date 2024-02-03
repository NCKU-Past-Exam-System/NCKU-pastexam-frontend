import React from 'react';
import { Box } from '@mui/system';
import { Navbar } from '../../conponents/Navbar/navbar';
import { Footer } from '../../conponents/Footer/footer';

export function Main() {
  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#080808',
    }}
    >
      <Navbar />
      <Box sx={{ display: 'flex', backgroundColor: '#080808' }} />
      <Footer />
    </Box>
  );
}
