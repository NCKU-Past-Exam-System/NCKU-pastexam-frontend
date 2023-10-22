import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../credential";
import { COURSE_TYPES } from "../../constants";
import { Collapse } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BorderRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
const closedMixin = ()=>({
    width: 240,
    backgroundColor:'#080808',
  });
const Drawer = styled(MuiDrawer)(
    ({ 
      width: 240,
        ...{
        ...closedMixin(),
        '& .MuiDrawer-paper': closedMixin(),
      },
    }),
  );
export const Sidebar = (props) => {
    const [open, setOpen] = useState([]);
    const { window } = props;
    const navigation = useNavigate();
    const [courses, setCourses] = useState([]);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 240;
    const handleClicked = (index) => {
        setOpen(open.map((value, i) => {
            if (i == index) {
                return !value;
            } else {
                return value;
            }
        }
        ));
    }
    useEffect(() => {
        setOpen(new Array(COURSE_TYPES.length).fill(false));
        const fetchData = async () => {
            const res = await axios.get(`${api}/courselist`);
            setCourses(res.data);
        };
        fetchData();

    }, []);
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        backgroundColor:'#DDE6ED',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
    const myDrawer = (
            <List sx={{backgroundColor:'#080808'}}>
                {COURSE_TYPES.map((group, index) => (
                    <div>
                        <ListItemButton onClick={() => handleClicked(index)} on>
                            <ListItemText sx={{color:'#DDE6ED'}} primary={group} />
                            {open[index] ? <ExpandLess sx={{color:'#DDE6ED'}}/> : <ExpandMore sx={{color:'#DDE6ED'}}/>}
                        </ListItemButton>
                        <Collapse color="#DDE6ED" in={open[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {courses.filter((course) => course.grade == index + 1).map((course) => (
                                    <ListItemButton sx={{ pl: 4 ,color:'#DDE6ED'}} onClick={() => navigation(`/main/${course.id}`)}>
                                        <ListItemText primary={course.course} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
    );

    return (
        <Drawer variant="permanent" sx={{backgroundColor:'#080808' ,BorderRight:3}} open={open}>
        <DrawerHeader/>
        {myDrawer}
      </Drawer>
    )
}