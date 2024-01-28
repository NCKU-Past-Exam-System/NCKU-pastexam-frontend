import React, { useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";
import { api } from "../../credential";
import { TableCellStyle } from "./style";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import deptIdTable from "../../data/deptIdTable.json"


export const CourseTable = ({courseData}) => {
  const navigation = useNavigate();
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      width: '100%', // Take up full container width
    }}>
      <TableContainer component={Paper} sx={{width:"80%"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{...TableCellStyle}} align="center">系所</TableCell>
            <TableCell sx={{...TableCellStyle}} align="center">學期</TableCell>
            <TableCell sx={{...TableCellStyle}} align="center">課程代碼</TableCell>
            <TableCell sx={{...TableCellStyle}} align="center">課程名稱</TableCell>
            <TableCell sx={{...TableCellStyle}} align="center">現任教授</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData.map((course) => (
            <TableRow
              key={course.id} // Assuming 'id' is unique
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 } ,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.4)', // Custom hover background color
                  transition: 'background-color 0.3s ease-in-out', // Smooth transition for the background color
                  // Add more hover styles here if needed
                },
              }}
              onClick={() => {
                navigation(`/files/${course.uid}`);
                window.location.reload();
              }
              }
            >
              <TableCell sx={{...TableCellStyle}} align="center" component="th" scope="row">{deptIdTable[course.dept]}</TableCell>
              <TableCell sx={{...TableCellStyle}} align="center">{course.sem}</TableCell>
              <TableCell sx={{...TableCellStyle}} align="center">{course.dept}-{course.id}</TableCell>
              <TableCell sx={{...TableCellStyle}} align="center">{course.name}</TableCell>
              <TableCell sx={{...TableCellStyle}} align="center">{course.teacher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )

}
