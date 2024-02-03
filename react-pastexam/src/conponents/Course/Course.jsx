import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormControl, Select, Typography, InputLabel, List, Collapse, ListItemText, ListItemButton,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TextFieldStyle, ButtonStyle } from './style';
import alldept from '../../data/dept.json';
import { SearchCourse } from '../../api';

export function Course({
  instructor, setInstructor, courseName, setCourseName, dept, setDept, courseData, setCourseData, setLoading,
}) {
  const [deptOpen, setDeptOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(Array(14).fill(false));
  const defaultDept = { a: '', b: '系所' };
  useEffect(() => {
    setDept(defaultDept);
  }, []);
  const handleClickGroup = ({ index, event }) => {
    event.stopPropagation();
    setGroupOpen((prevGroupOpen) => {
      const updatedGroupOpen = [...prevGroupOpen];
      updatedGroupOpen[index] = !updatedGroupOpen[index];
      return updatedGroupOpen;
    });
  };
  const handleDeptClick = (event, dept) => {
    setDeptOpen(false);
    setDept(dept);
  };
  const handleSearchCourse = (course_name, instructor, dept) => {
    setCourseData({});
    setLoading(true);
    SearchCourse(course_name = course_name, instructor = instructor, dept = dept).then((res) => {
      if (res.data.status == 'error') {
        alert(res.data.message);
        setLoading(false);
        return;
      }
      setCourseData(res.data);
      setLoading(false);
    });
  };
  const handleSearchClicked = () => {
    if (courseName == '' && instructor == '' && dept.a == '') {
      alert('請輸入搜尋條件');
      return;
    }
    handleSearchCourse(courseName, instructor, dept.a);
    setDept(defaultDept);
    setInstructor('');
    setCourseName('');
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      width: '100%', // Take up full container width
    }}
    >
      <Box sx={{
        display: 'flex', flexDirection: 'column', paddingTop: '100px', width: '80%',
      }}
      >
        <Typography variant="h3" color="white" fontWeight="bold" marginLeft="0.5%">
          課程查詢
        </Typography>
        <Box sx={{
          display: 'flex', width: '70%', justifyContent: 'space-between', my: 2,
        }}
        >
          <FormControl sx={{ width: '25%', mr: 1 }}>
            <TextField
              id="course"
              label="課程名稱"
              variant="outlined"
              InputLabelProps={{
                style: { color: 'lightgray', fontSize: '1.3rem' },
              }}
              onChange={(event) => setCourseName(event.target.value)}
              value={courseName}
              sx={{
                mx: '2%',
                width: '100%',
                input: { color: 'white' },
                ...TextFieldStyle,
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '25%', mr: 1 }}>
            <TextField
              id="professor"
              label="教授"
              variant="outlined"
              onChange={(event) => setInstructor(event.target.value)}
              value={instructor}
              InputLabelProps={{
                style: { color: 'lightgray', fontSize: '1.3rem' },
              }}
              sx={{
                mx: '1%',
                width: '100%',
                input: { color: 'white' },
                ...TextFieldStyle,
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '30%', mr: 1 }}>
            <InputLabel
              disableAnimation
              shrink={false}
              sx={{
                color: 'lightgray', fontSize: '1.3rem', mx: '2%', backgroundColor: '#080808',
              }}
            >
              {dept.b}
            </InputLabel>
            <Select
              labelId="type-label"
              labelStyle={{ color: '#ff0000' }}
              id="type"
              sx={{
                width: '100%',
                mx: '2%',
                color: 'white',
                ...TextFieldStyle,
              }}
              open={deptOpen}
              onOpen={() => setDeptOpen(true)}
              onClose={() => setDeptOpen(false)}
            >
              <List component="nav">
                {alldept.map((group, index) => (
                  <div>
                    <ListItemButton onClick={(event) => handleClickGroup({ index, event })}>
                      <ListItemText primary={group.group} />
                      {groupOpen[index] ? (
                        <IconButton edge="end">
                          <ChevronRightIcon />
                        </IconButton>
                      ) : (
                        <IconButton edge="end">
                          <ExpandMoreIcon />
                        </IconButton>
                      )}
                    </ListItemButton>
                    <Collapse in={groupOpen[index]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {group.dept.map((dept) => (
                          <ListItemButton sx={{ pl: 4 }} onClick={(event) => handleDeptClick(event, dept)}>
                            <ListItemText primary={dept.b} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                ))}
              </List>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            sx={{
              ...ButtonStyle,
            }}
            onClick={() => handleSearchClicked()}
          >
            搜尋
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
