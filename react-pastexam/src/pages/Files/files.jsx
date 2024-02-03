import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { darkTheme, ButtonStyle } from './style';
import { FileTable } from '../../conponents/FileTable/fileTable';
import { Footer } from '../../conponents/Footer/footer';
import { Navbar } from '../../conponents/Navbar/navbar';
import { FileUploadDialog } from '../../conponents/FileUploadDialog/fileUploadDialog';
import { Loading } from '../../conponents/Loading/loading';
import { SearchCourse } from '../../api';

export function Files() {
  const location = useLocation();
  const courseUid = location.pathname.split('/')[2];
  const [courseInfo, setCourseInfo] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    fetchCourseInfo();
    console.log(courseUid);
  }, []);
  const fetchCourseInfo = async () => {
    SearchCourse('', '', '', courseUid)
      .then((res) => {
        setCourseInfo(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setCourseInfo({ name: 'Not Found' });
      });
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
    console.log(dialogOpen);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#080808',
      }}
      >
        <Navbar />
        <Box sx={{
          paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        >
          {(courseInfo.hasOwnProperty('name') && courseInfo.name != 'Not Found') && (
            <Box sx={{
              width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
            >
              <Box sx={{
                width: '80%', display: 'flex', flexDirection: 'row', paddingBottom: '20px',
              }}
              >
                <Typography variant="h4" sx={{ width: '80%' }}>
                  {courseInfo.dept}
                  -
                  {courseInfo.id}
                  {' '}
                  {courseInfo.name}
                  {' '}
                  {courseInfo.teacher}
                </Typography>
                <Button variant="outlined" sx={{ ...ButtonStyle }} onClick={handleDialogOpen}>上傳考古題</Button>
                {dialogOpen && <FileUploadDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} uid={courseUid} />}
              </Box>
              {loading ? <Loading /> : null}

              <FileTable uid={courseUid} setLoading={setLoading} />
            </Box>
          )}
          {(courseInfo.hasOwnProperty('name') && courseInfo.name == 'Not Found') && (
            <Box sx={{
              width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
            >
              <Box sx={{
                width: '80%', display: 'flex', flexDirection: 'row', paddingBottom: '20px',
              }}
              >
                <Typography variant="h3" align="center" sx={{ width: '100%' }}>課程不存在</Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Footer />
      </Box>
      <Box />
    </ThemeProvider>

  );
}
