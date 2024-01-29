import React from "react";
import { Navbar } from "../Navbar/navbar";
import { Box, Button, FormControl, Select, Typography, InputLabel, MenuItem, MenuList, List, Collapse, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { TextField } from "@mui/material";
import axios from "axios";
import { api } from "../../credential";
import { useEffect, useState } from "react";
import { Course_table } from "../CourseTable/courseTable";
import { TextFieldStyle, ButtonStyle } from "./style";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import alldept from "../../data/dept.json";

export const SearchCourse = ({ instructor, setInstructor, CourseName, setCourseName, dept, setDept, courseData, setCourseData, setLoading }) => {
    const [deptOpen, setDeptOpen] = useState(false);
    const [groupOpen, setGroupOpen] = useState(Array(14).fill(false));
    const defaultDept = { a: "", b: "系所" };
    useEffect(() => {
        setDept(defaultDept);
    }, []);
    const handleClickGroup = ({ index: index, event }) => {
        event.stopPropagation();
        console.log(index);
        setGroupOpen((prevGroupOpen) => {
            const updatedGroupOpen = [...prevGroupOpen];
            updatedGroupOpen[index] = !updatedGroupOpen[index];
            return updatedGroupOpen;
        });
    };
    const handleDeptClick = (event, dept) => {
        setDeptOpen(false);
        setDept(dept);
        console.log(dept);
    };
    const searchCourse = (course_name, instructor, dept) => {
        setCourseData([]);
        console.log("dept: " + dept);
        setLoading(true);
        axios.get(api + "/search", {
            params: {
                ...(course_name && { course_name }),
                ...(instructor && { instructor }),
                ...(dept && { dept }),
            },
        }).then((res) => {
            setCourseData(res.data);
            console.log(courseData);
            setLoading(false);
        })
    };
    const handleSearchClicked = (coursename, ins, out_dept) => {
        if (coursename == '' && ins == '' && out_dept == '') {
            alert("請輸入搜尋條件");
            return;
        }
        searchCourse(coursename, ins, out_dept);
        setDept(defaultDept);
        setCourseName("");
        setInstructor("");
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center children horizontally
            width: '100%', // Take up full container width
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '100px', width: "80%" }}>
                <Typography variant="h3" color={"white"} fontWeight={'bold'} marginLeft={'0.5%'}>
                    課程查詢
                </Typography>
                <Box sx={{ display: { md: 'flex', xs: 'none' }, width: "70%", my: 2 }}>
                    <FormControl sx={{ width: "25%", flexDirection: 'row' }}>
                        <TextField id="course" label="課程名稱" variant="outlined"
                            InputLabelProps={{
                                style: { color: "lightgray", fontSize: '1.3rem' }
                            }}
                            value={CourseName}
                            onChange={(event) => setCourseName(event.target.value)}
                            sx={{
                                mx: '2%',
                                width: '100%',
                                input: { color: 'white' },
                                ...TextFieldStyle
                            }} />
                    </FormControl>
                    <FormControl sx={{ width: "25%", flexDirection: 'row' }}>
                        <TextField id="professor" label="教授" variant="outlined"
                            onChange={(event) => setInstructor(event.target.value)}
                            value={instructor}
                            InputLabelProps={{
                                style: { color: "lightgray", fontSize: '1.3rem' }
                            }}
                            sx={{
                                mx: '1%',
                                width: '100%',
                                input: { color: 'white' },
                                ...TextFieldStyle
                            }}

                        />
                    </FormControl>
                    <FormControl sx={{ width: "30%", flexDirection: 'row' }}>
                        <InputLabel disableAnimation={true} shrink={false} sx={{ color: "lightgray", fontSize: '1.3rem', mx: '2%', backgroundColor: "#080808" }}>{dept.b}</InputLabel>
                        <Select
                            labelId="type-label"
                            labelStyle={{ color: '#ff0000' }}
                            id="type"
                            sx={{
                                width: '100%',
                                mx: '2%',
                                color: "white",
                                ...TextFieldStyle
                            }}
                            open={deptOpen}
                            onOpen={() => setDeptOpen(true)}
                            onClose={() => setDeptOpen(false)}
                        >
                            <List component="nav">
                                {alldept.map((group, index) => (
                                    <div>
                                        <ListItemButton onClick={(event) => handleClickGroup({ index: index, event: event })}>
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
                                ))
                                }
                            </List>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" sx={{
                        ...ButtonStyle
                    }}
                        onClick={() => handleSearchClicked(CourseName, instructor, dept.a)}
                    >
                        搜尋
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}