import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { GetLatestFile } from '../../api';
import { convertUnixTimeToDate } from '../../functions';
export const LatestFiles = () => {
    const [latestFiles, setLatestFiles] = useState([]);
    const handleGetLatestFiles = async (quantity) => {
        GetLatestFile(quantity).then((res) => {
            setLatestFiles(res.data.data);
            console.log(res.data.data);
            
        }).catch((error) => {
            console.log(error);
            setLatestFiles([]);
        });
    }
    useEffect(() => {
        handleGetLatestFiles(10);//default quantity to be 10
    }, []);

    return (
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: '1rem' }}>
          Latest Files
        </Typography>
        <Table sx={{ minWidth: 300, width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width:'30%' }}>課程名稱</TableCell>
              <TableCell sx={{ width:'25%' }}>檔案名稱</TableCell>
              <TableCell sx={{ width:'15%' }}>上傳者</TableCell>
              <TableCell sx={{ width:'30%' }}>上傳時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestFiles?.map((file) => (
              <TableRow key={file.hash}>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {file.course_name}
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {file.name}
                </TableCell>
                <TableCell>{file.uploader}</TableCell>
                <TableCell>{convertUnixTimeToDate(file.upload_time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

