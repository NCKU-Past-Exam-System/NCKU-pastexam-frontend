import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { api } from "../../credential";
import { Loading } from "./style";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {styled} from "@mui/material";
import {Table as muiTable} from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FileCopySharp, FileOpenSharp } from "@mui/icons-material";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const handleDownload = (filename,id) => {
    axios.get(`${api}/files/?course_id=${id}&file_name=${filename}`, {
        responseType: 'blob',
    }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch((err) => {
        alert(err);
    }, []);
}
const fileTable = (files,id) => {
    return(
    <muiTable>
                <TableHead>
                    <TableRow>
                        <TableCell width="5%" align="center"><Typography variant="h6"  >年份</Typography></TableCell>
                        <TableCell width="5%" align="center"><Typography variant="h6"  >類型</Typography></TableCell>
                        <TableCell width="5%" align="center"><Typography variant="h6"  >老師</Typography></TableCell>
                        <TableCell width="20%"  align="center"><Typography variant="h6"  >檔名</Typography></TableCell>
                        <TableCell width="5%"  align="center"><Typography variant="h6"  ></Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((row) => (
                    <TableRow hover={true}>
                        <TableCell align="center"><Typography variant="h6"  >{row.year}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6"  >{row.type}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6"  >{row.teacher}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6"  >{row.filename}{'    '}</Typography></TableCell>
                        <TableCell align="center"><Button variant="contained" onClickCapture={()=>handleDownload(row.filename,id)}>下載</Button></TableCell>
                    </TableRow>
                   ))}
                </TableBody>
            </muiTable>
    )
}
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
       
        <Box m='auto' component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {id < 1 || id == undefined ? <h1>請選擇科目</h1> :
                <div>
                    {loading || files.length == 0 ? <Loading /> : <div>
                        {(!loading && JSON.stringify(files) == '{"error":"not found"}') ? <Typography variant="h3" align="center" >
                            目前🈚️考古題
                        </Typography> :
                            fileTable(files,id)
                        }
                    </div>}
                </div>}
        </Box>
    )
}
