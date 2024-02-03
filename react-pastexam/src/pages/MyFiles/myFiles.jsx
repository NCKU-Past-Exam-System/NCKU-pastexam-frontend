import React from 'react';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Navbar } from '../../conponents/Navbar/navbar';
import { Footer } from '../../conponents/Footer/footer';
import { MyFileTable } from '../../conponents/MyFileTable/myFileTable';
import { darkTheme } from './style';
import { Loading } from '../../conponents/Loading/loading';

export function MyFiles() {
  const location = useLocation();
  const courseUid = location.pathname.split('/')[2];
  const [courseInfo, setCourseInfo] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#080808',
        }}
      >
        <Navbar />
        <Box
          sx={{
            paddingTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {loading ? <Loading /> : null}
            <MyFileTable uid={courseUid} setLoading={setLoading} />
          </Box>
        </Box>
        <Footer />
      </Box>
      <Box />
    </ThemeProvider>
  );
}
