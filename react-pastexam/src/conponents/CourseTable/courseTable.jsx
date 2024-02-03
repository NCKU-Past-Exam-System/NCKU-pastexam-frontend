import React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableCellStyle, TableRowStyle } from './style';
import deptIdTable from '../../data/deptIdTable.json';

export function CourseTable({ courseData }) {
  const navigation = useNavigate();
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      width: '100%', // Take up full container width
    }}
    >
      <TableContainer component={Paper} sx={{ width: '80%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...TableCellStyle }} align="center">系所</TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">學期</TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">課程代碼</TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">課程名稱</TableCell>
              <TableCell sx={{ ...TableCellStyle }} align="center">現任教授</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(courseData).length > 0 && (courseData?.data.length > 0
              ? (courseData.data.map((course) => (
                <TableRow
                  key={course.id} // Assuming 'id' is unique
                  sx={{ ...TableRowStyle }}
                  onClick={() => {
                    navigation(`/files/${course.uid}`);
                    window.location.reload();
                  }}
                >
                  <TableCell sx={{ ...TableCellStyle }} align="center" component="th" scope="row">{deptIdTable[course.dept]}</TableCell>
                  <TableCell sx={{ ...TableCellStyle }} align="center">{course.sem}</TableCell>
                  <TableCell sx={{ ...TableCellStyle }} align="center">
                    {course.dept}
                    -
                    {course.id}
                  </TableCell>
                  <TableCell sx={{ ...TableCellStyle }} align="center">{course.name}</TableCell>
                  <TableCell sx={{ ...TableCellStyle }} align="center">{course.teacher}</TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...TableCellStyle }} align="center" colSpan={5}>查無符合條件的資料</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
