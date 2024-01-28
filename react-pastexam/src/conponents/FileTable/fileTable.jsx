import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { TableCellStyle } from './style';
import { useEffect } from 'react';
import { api } from '../../credential';
export const FileTable = ({ uid }) => {
    const [fileData, setFileData] = React.useState([]);
    const handleFetchFileList = async () => {
        const res = await fetch(`${api}/main/${uid}`);
        const data = await res.json();
        setFileData(data);
        console.log(data);
    }
    useEffect(() => {
        handleFetchFileList();
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center children horizontally
            width: '100%',
        }}>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ ...TableCellStyle }} align="center">年份</TableCell>
                            <TableCell sx={{ ...TableCellStyle }} align="center">類型</TableCell>
                            <TableCell sx={{ ...TableCellStyle }} align="center">教授</TableCell>
                            <TableCell sx={{ ...TableCellStyle }} align="center">檔名</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fileData.map((file) => (
                        <TableRow
                            key={file.id}// Assuming 'id' is unique
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.4)', // Custom hover background color
                                    transition: 'background-color 0.3s ease-in-out', // Smooth transition for the background color
                                    // Add more hover styles here if needed
                                },
                            }}
                        >
                            <TableCell sx={{ ...TableCellStyle }} align="center" component="th" scope="row">{file.year}</TableCell>
                            <TableCell sx={{ ...TableCellStyle }} align="center">{file.type}</TableCell>
                            <TableCell sx={{ ...TableCellStyle }} align="center">{file.teacher}</TableCell>
                            <TableCell sx={{ ...TableCellStyle }} align="center">{file.name}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
