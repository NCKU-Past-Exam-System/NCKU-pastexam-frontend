import React from 'react';
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
import { TableCellStyle, TableRowStyle } from './style';
import { useEffect } from 'react';
import { api } from '../../credential';
import axios from 'axios';
export const FileTable = ({ uid, setLoading }) => {
  const [fileData, setFileData] = React.useState([]);
  const handleFetchFileList = async () => {
    setLoading(true);
    axios.get(`${api}/main/${uid}`).then((res) => {
      setFileData(res.data);
      console.log(res.data);
      setLoading(false);
    }).catch((error) => {
        console.log(error);
        setFileData([]);
    });
  };
  useEffect(() => {
    handleFetchFileList();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center children horizontally
        width: '100%',
      }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(fileData).length > 0 &&
              (fileData?.data.length > 0 ? (
                fileData.data.map((file) => (
                    <TableRow
                      key={file.id} // Assuming 'id' is unique
                      sx={{
                        ...TableRowStyle,
                      }}>
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
};
