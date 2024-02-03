import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Menu,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { TableCellStyle, TableRowStyle } from './style';
import { googleOathLogout, getCookie } from '../LoginCookie/loginCookie';
import { DeleteFile, DownloadFile, FetchMyFileList } from '../../api';

export function MyFileTable({ setLoading }) {
  const [fileData, setFileData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRowId, setOpenRowId] = useState(null);
  const handleFetchMyFileList = () => {
    setLoading(true);
    FetchMyFileList().then((res) => {
      setFileData(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        alert('請重新登入');
        googleOathLogout();
      }
      setFileData([]);
    });
  };
  const handleDownload = (hash, filename) => {
    DownloadFile(hash).then((res) => {
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch((error) => {
      console.log(error.response);
    });
    handleClose();
  };
  const handleDelete = (hash) => {
    DeleteFile(hash).then((res) => {
      console.log(res);
      handleFetchMyFileList();
    }).catch((error) => {
      console.log(error.response);
    });
    handleClose();
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenRowId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenRowId(null);
  };

  useEffect(() => {
    console.log(getCookie('token'));
    if (getCookie('token') != '') {
      handleFetchMyFileList();
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center children horizontally
        width: '100%',
      }}
    >
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                年份
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                類型
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                課程名稱
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                教授
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                檔名
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(fileData).length > 0
              && (fileData?.data.length > 0 ? (
                fileData.data.map((file) => (
                  <TableRow
                    key={file.hash} // Assuming 'id' is unique
                    sx={{
                      ...TableRowStyle,
                    }}
                  >
                    <TableCell sx={{ ...TableCellStyle }} align="center" component="th" scope="row">
                      {file.year}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.type}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.course_name}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.teacher}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.name}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleClick(event, file.hash)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && openRowId === file.hash}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => { handleDownload(file.hash, file.name); }}>下載</MenuItem>
                        <MenuItem onClick={handleClose}>重新命名</MenuItem>
                        <MenuItem onClick={() => { console.log(file);handleDelete(file.hash); }}>刪除</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...TableCellStyle }} align="center" colSpan={6}>
                    目前無檔案
                  </TableCell>
                </TableRow>
              ))}
            {getCookie('token') == '' && (
              <TableRow>
                <TableCell sx={{ ...TableCellStyle }} align="center" colSpan={6}>
                  請先登入
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
