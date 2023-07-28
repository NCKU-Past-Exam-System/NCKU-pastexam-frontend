import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SidebarContainer, SidebarItem,List } from "./style";
import {api} from "../../credential";
import {COURSE_TYPES} from "../../constants";
export const Sidebar = () => {
    const navigation = useNavigate();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res= await axios.get(`${api}/courselist`);
            setCourses(res.data);
        };
        fetchData();

    }, []);
    return (
        <SidebarContainer>
            成大資工考古題系統
            {
                COURSE_TYPES.map((group, index) => {
                    return (
                        <div>
                            {group}
                            {
                                courses.map((course) => (
                                    <SidebarItem>
                                    <List onClick={() => {navigation(`/main/${course.id}`);}}>
                                        {course.grade == index + 1 && course.course}
                                    </List>
                                    </SidebarItem>
                                )
                                )
                            }
                        </div>
                    )
                })
            }
        </SidebarContainer>
    )
}