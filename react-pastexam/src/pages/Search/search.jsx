import React from "react";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box, Button, FormControl, Select, Typography, InputLabel, MenuItem, MenuList, List, Collapse, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { TextField } from "@mui/material";
import axios from "axios";
import { course_api } from "../../credential";
import { useEffect, useState } from "react";
import { Course_table } from "../../conponents/Course_table/course_table";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Search = () => {
    const [deptData, setDeptData] = useState([]);
    const [deptName, setDeptName] = useState("");
    const [selectedDept, setSelectedDept] = useState("");
    const [deptOpen, setDeptOpen] = useState(false);
    const [groupOpen, setGroupOpen] = useState(Array(14).fill(false));
    useEffect(() => {
        const fetchAllDept = async () => {
            try {
                const endpoint = course_api + "/alldept";
                const response = await axios.get(endpoint);
                const data = response.data;
                setDeptData(data.data.deptGroup);
            } catch (error) {
                console.error("Error fetching department data:", error);
            }
        };

        fetchAllDept();
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
    const handleDeptClick = (event) => {
        setDeptOpen(false);
        setSelectedDept(event.target.innerText);
        console.log(event);
    };
    return (
        <div>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '100px' }}>
                <Typography variant="h3" color={"white"} fontWeight={'bold'} marginLeft={'0.5%'}>
                    課程查詢
                </Typography>
                <Box sx={{ display: { md: 'flex', xs: 'none' }, width: "50%", my: 2 }}>
                    <FormControl sx={{ width: '50%', flexDirection: 'row' }}>
                        <TextField id="teacher" label="課程名稱" variant="outlined"
                            InputLabelProps={{
                                style: { color: "lightgray", fontSize: '1.3rem' }
                            }}
                            sx={{
                                mx: '2%',
                                width: '50%',
                                input: { color: 'white' },
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233,0.5)',
                                    borderWidth: '3px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.5)',
                                    borderWidth: '3px',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.4)',
                                    borderWidth: '3px',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }} />
                        <TextField id="teacher" label="教授" variant="outlined"
                            InputLabelProps={{
                                style: { color: "lightgray", fontSize: '1.3rem' }
                            }}
                            sx={{
                                mx: '1%',
                                width: '50%',
                                input: { color: 'white' },
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233,0.5)',
                                    borderWidth: '3px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.5)',
                                    borderWidth: '3px',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.4)',
                                    borderWidth: '3px',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }} />
                    </FormControl>
                    <FormControl sx={{ width: '40%', justifyContent: 'flex-start' }}>
                        <InputLabel disableAnimation={true} shrink={false} sx={{ color: "lightgray", fontSize: '1.3rem', mx: '2%', backgroundColor: "#080808" }}>{(selectedDept == '') ? "系所" :selectedDept.slice(0, 2) + " " + selectedDept.slice(2)}</InputLabel>
                        <Select
                            labelId="type-label"
                            labelStyle={{ color: '#ff0000' }}
                            id="type"
                            label="type"
                            required="true"
                            sx={{
                                mx: '2%',
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233,0.5)',
                                    borderWidth: '3px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.5)',
                                    borderWidth: '3px',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.4)',
                                    borderWidth: '3px',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }}
                            open={deptOpen}
                            onOpen={() => setDeptOpen(true)}
                            onClose={() => setDeptOpen(false)}
                        >
                            <List component="nav">
                                {deptData.map((group, index) => (
                                    <div>
                                        <ListItemButton onClick={(event) => handleClickGroup({ index: index, event: event })}>
                                            <ListItemText primary={group.name} />
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
                                                    <ListItemButton sx={{ pl: 4 }} onClick={(event, dept) => handleDeptClick(event, dept)}>
                                                        <ListItemText primary={dept} />
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
                </Box>
                <Button variant="outlined" sx={{
                    color: 'lightgray',
                    fontSize: '1.3rem',
                    width: '5%',
                    margin: '0.5%',
                    borderColor: 'rgba(228, 219, 233, 0.5)',
                    borderWidth: '3px',
                    borderRadius: '3px',
                    ":hover": {
                        borderColor: 'rgba(228, 219, 233, 0.25)',
                        borderWidth: '3px',
                    }
                }}
                >
                    搜尋
                </Button>
            </Box>
        </div>
    )
}