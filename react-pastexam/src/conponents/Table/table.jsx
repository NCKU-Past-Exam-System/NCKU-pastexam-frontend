import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { api } from "../../credential";
import { Loading } from "./style";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import {styled} from "@mui/material";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
export const Table = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchFile = async (id) => {
        setLoading(true);
        const res = await axios.get(`${api}/main/${id}`);
        setFiles(res.data);
        setLoading(false);
    }
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    useEffect(() => {
        fetchFile(id);
    }, [id]);
    return (
       
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
             <DrawerHeader/>
            {id < 1 || id == undefined ? <h1>請選擇科目</h1> :
                <div>
                    {loading || files.length == 0 ? <Loading /> : <div>
                        {(!loading && JSON.stringify(files) == '{"error":"not found"}') ? <Typography variant="h6"  >
                            目前🈚️考古題
                        </Typography> :
                            files.map((file) => (
                                <Typography variant="h6" >
                                    {[file.year, ' ', file.teacher, ' ', file.type, ' ', file.filename]}
                                    </Typography>
                            ))
                        }
                    </div>}

                </div>}
        </Box>
    )
}
