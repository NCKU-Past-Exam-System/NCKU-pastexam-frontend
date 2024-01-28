import React from "react";
import { SearchCourse } from "../../conponents/SearchCourse/searchCourse";
import { Box, Typography } from "@mui/material";
import { CourseTable } from "../../conponents/CourseTable/courseTable";
import { ThemeProvider ,createTheme} from '@mui/material/styles';
import { Navbar } from "../../conponents/Navbar/navbar";
const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Switches the theme to dark mode
      // You can also customize other theme aspects like primary and secondary colors
    },
    // Add any other theme customizations here
  });
export const Search = () => {
    const [courseName, setCourseName] = React.useState("");
    const [instructor, setInstructor] = React.useState("");
    const [dept, setDept] = React.useState("");
    const [courseData, setCourseData] = React.useState([]);
    return (
        <ThemeProvider theme={darkTheme}>
        <Box>
            <Navbar />
            <SearchCourse
                courseName={courseName} setCourseName={setCourseName}
                instructor={instructor} setInstructor={setInstructor}
                dept={dept} setDept={setDept}
                courseData={courseData} setCourseData={setCourseData}
            />
            <Typography>
                {courseName}
            </Typography>
            <CourseTable courseData={courseData}/>
        </Box>
        </ThemeProvider>
    )
}