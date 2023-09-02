import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { api } from "../../credential";
import { Loading } from "./style";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {styled} from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {googleLogout} from '@react-oauth/google';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
const handleDownload = (filename,id) => {
    axios.get(`${api}/files/?course_id=${id}&file_name=${filename}`, {
        responseType: 'blob',
        withCredentials: true,
        headers: {
            'token': sessionStorage.getItem('token'),
        }}
    ).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
        if(error.message == 'Network Error'){
            alert('server error');
            return;
        }
        const reader = new FileReader();
        reader.readAsText(error?.response?.data,'utf-8');
        reader.onload = ()  => {
            alert(JSON.parse(reader.result).message);
            if(JSON.parse(reader.result).message=='Token Expired! Please Relogin!'||JSON.parse(reader.result).message=='Unvalid Login! Please Relogin!'){
                googleLogout();
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('info');
                window.location.reload();
                } 
        }
          
      });
}
const fileTable = (files,id) => {
    return(
    <muiTable>
                <TableHead>
                    <TableRow>
                        <TableCell width="5%" align="center"><Typography variant="h6"  color={'#DDE6ED'}>年份</Typography></TableCell>
                        <TableCell width="5%" align="center"><Typography variant="h6"  color={'#DDE6ED'}>類型</Typography></TableCell>
                        <TableCell width="5%" align="center"><Typography variant="h6"  color={'#DDE6ED'}>老師</Typography></TableCell>
                        <TableCell width="20%" align="center"><Typography variant="h6" color={'#DDE6ED'}>檔名</Typography></TableCell>
                        <TableCell width="5%"  align="center"><Typography variant="h6" color={'#DDE6ED'}></Typography></TableCell>
                        <TableCell width="20%"  align="center"><Typography variant="h6" color={'#DDE6ED'}>上傳者</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((row) => (
                    <TableRow hover={true} >
                        <TableCell align="center"><Typography variant="h6"  color={'#DDE6ED'}>{row.year}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6"  color={'#DDE6ED'}>{row.type}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6"  color={'#DDE6ED'}>{row.teacher}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6"  color={'#DDE6ED'}>{row.filename}{'    '}</Typography></TableCell>
                        <TableCell align="center"><Button variant="contained" sx={{backgroundColor:'#9DB2BF'}} onClickCapture={()=>handleDownload(row.filename,id)}>下載</Button></TableCell>
                        <TableCell align="center"><Typography variant="h6"  color={'#DDE6ED'}>{row.uploader}{'    '}</Typography></TableCell>
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
            {id < 1 || id == undefined ? <Typography variant="h3" color={'#DDE6ED'}  paddingLeft={'38%'} >請選擇科目</Typography> :
                <div>
                    {loading || files.length == 0 ? <Loading /> : <div>
                        {(!loading && JSON.stringify(files) == '{"error":"not found"}') ? <Typography variant="h3" color={'#DDE6ED'}  paddingLeft={'38%'}>
                            目前🈚️考古題
                        </Typography> :
                            fileTable(files, id)
                        }
                    </div>}
                </div>}
                
        </Box>

    )
}
