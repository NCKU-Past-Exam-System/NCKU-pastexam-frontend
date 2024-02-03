import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { TableCellStyle, TableRowStyle } from './style';
import { FetchFileListByCourse, DownloadFile } from '../../api';

export function FileTable({ uid, setLoading }) {
  const [fileData, setFileData] = React.useState([]);
  const handleFetchFileList = async () => {
    setLoading(true);
    FetchFileListByCourse(uid).then((res) => {
      setFileData(res.data);
      console.log(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
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
  };
  useEffect(() => {
    handleFetchFileList();
    axios.defaults.withCredentials = true;
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
                教授
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                檔名
              </TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">
                上傳者
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(fileData).length > 0
              && (fileData?.data.length > 0 ? (
                fileData.data.map((file) => (
                  <TableRow
                    key={file.id} // Assuming 'id' is unique
                    sx={{
                      ...TableRowStyle,
                    }}
                    onClick={() => {
                      console.log(file.hash);
                      handleDownload(file.hash, file.name);
                    }}
                  >
                    <TableCell sx={{ ...TableCellStyle }} align="center" component="th" scope="row">
                      {file.year}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.type}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.teacher}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.name}
                    </TableCell>
                    <TableCell sx={{ ...TableCellStyle }} align="center">
                      {file.uploader}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...TableCellStyle }} align="center" colSpan={5}>
                    目前無檔案
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
