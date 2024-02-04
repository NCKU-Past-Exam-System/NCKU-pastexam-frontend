import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Course } from '../../conponents/Course/Course';
import { CourseTable } from '../../conponents/CourseTable/courseTable';
import { Navbar } from '../../conponents/Navbar/navbar';
import { Loading } from '../../conponents/Loading/loading';
import { Footer } from '../../conponents/Footer/footer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Switches the theme to dark mode
    // You can also customize other theme aspects like primary and secondary colors
  },
  // Add any other theme customizations here
});
export function Search() {
  const [courseName, setCourseName] = React.useState('');
  const [instructor, setInstructor] = React.useState('');
  const [dept, setDept] = React.useState('');
  const [courseData, setCourseData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#080808',
        }}>
        <Navbar />
        <Course
          courseName={courseName}
          setCourseName={setCourseName}
          instructor={instructor}
          setInstructor={setInstructor}
          dept={dept}
          setDept={setDept}
          courseData={courseData}
          setCourseData={setCourseData}
          setLoading={setLoading}
        />

        {loading ? <Loading /> : null}
        <CourseTable courseData={courseData} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
