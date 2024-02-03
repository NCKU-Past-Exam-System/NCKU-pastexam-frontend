import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import {api} from "../../credential";
import { UploadFile } from '../../api';

export const FileUploadDialog = ({ dialogOpen, setDialogOpen,uid }) => {
    const yearlist = [112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 101];
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedSemester, setSelectedSemester] = useState(0);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const handleUpload = () => {
        const formData = new FormData();
        if (uid == undefined || selectedType == undefined || selectedTeacher == undefined || selectedYear == undefined || selectedSemester == undefined) {
          alert("請填寫完整資料");
          return;
        }
        if (selectedFile == undefined) {
          alert("請選擇檔案");
          return;
        }
        formData.append('file', selectedFile);
        
        UploadFile(uid,selectedYear,selectedType,selectedTeacher,formData).then((res) => {
          console.log(res);
          if (res.data.status == 'error') {
            alert("上傳失敗 " + res.data.message);
          } else {
            alert("上傳成功");
          }
        }).catch((error) => {
          if (error.message == 'Network Error') {
            alert('server error');
            return;
          }
    
          alert(error.response.data.message);
          if (error.response.data.message == 'Token Expired! Please Relogin!' || error.response.data.message == 'Unvalid Login! Please Relogin!') {
            window.location.reload();
          }
    
        }
        );
        console.log(formData);
      }
    const handleClose = () => setDialogOpen(false);
    const handleTypeChange = (event) => { setSelectedType(event.target.value); };
    const handleSemesterChange = (event) => { setSelectedSemester(event.target.value); };
    const handleYearChange = (event) => { setSelectedYear(event.target.value); };
    const handleTeacherChange = (event) => { setSelectedTeacher(event.target.value); };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    }, []);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Dialog open={dialogOpen} onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: '80%', // Set your desired width
                        maxWidth: '600px', // Optional: Set a maximum width
                    }
                }}
            >
                <DialogTitle>上傳考古題</DialogTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',mb:2 }}>
                    <FormControl sx={{ width: "25%", mr: 2 }}>
                        <InputLabel sx={{ color: "#9DB2BF" }}>類型</InputLabel>
                        <Select onChange={handleTypeChange}>
                            <MenuItem value='miderm'>期中考</MenuItem>
                            <MenuItem value='final'>期末考</MenuItem>
                            <MenuItem value='quiz'>小考</MenuItem>
                            <MenuItem value='hw'>作業</MenuItem>
                            <MenuItem value='others'>其他</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "15%", mr: 2 }}>
                        <InputLabel sx={{ color: "#9DB2BF" }}>學年</InputLabel>
                        <Select onChange={handleYearChange}>
                            {yearlist.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "15%", mr: 2 }}>
                        <InputLabel sx={{ color: "#9DB2BF" }}>學期</InputLabel>
                        <Select onChange={handleSemesterChange}>
                            <MenuItem value='1'>上</MenuItem>
                            <MenuItem value='2'>下</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "25%" }}>
                        <TextField placeholder='教授' onChange={handleTeacherChange}/>
                    </FormControl>
                </Box>

                <DialogContent
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    sx={{
                        border: '2px dashed #90caf9',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: '#90caf9',
                    }}
                >
                    <Typography variant="body1">Drag and drop a file here, or click to select a file</Typography>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload-input"
                    />
                    <label htmlFor="file-upload-input">
                        <Button variant="contained" component="span" sx={{ mt: 2 }}>
                            Choose File
                        </Button>
                    </label>
                    {selectedFile && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Selected file: {selectedFile.name}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
