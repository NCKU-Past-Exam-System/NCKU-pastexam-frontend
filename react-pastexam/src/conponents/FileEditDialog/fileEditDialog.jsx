import * as React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, Box,
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { EditFile } from '../../api';

export function FileEditDialog({ dialogOpen, setDialogOpen,defaultValue}) {
  const yearlist = [112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 101];

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const handleEditFile = () => {
    const formData = new FormData();
    if ( selectedType == undefined || selectedTeacher == undefined || selectedYear == undefined || selectedSemester == undefined) {
      alert('請填寫完整資料');
      return;
    }

    EditFile( defaultValue.hash,selectedYear, selectedType, selectedTeacher,newFileName).then((res) => {
      console.log(res);
      if (res.data.status == 'error') {
        alert(`錯誤： ${res.data.message}`);
      } else {
        alert('更新成功');
        window.location.reload();
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
    });
    console.log(formData);
  };
  const handleClose = () => setDialogOpen(false);
  const handleTypeChange = (event) => { setSelectedType(event.target.value); };
  const handleSemesterChange = (event) => { setSelectedSemester(event.target.value); };
  const handleYearChange = (event) => { setSelectedYear(event.target.value); };
  const handleTeacherChange = (event) => { setSelectedTeacher(event.target.value); };
  const handleFileNameChange = (event) => { setNewFileName(event.target.value); };


  useEffect(() => {
    if (defaultValue != undefined) {
      setSelectedType(defaultValue.type);
      setSelectedYear(defaultValue.year);
      setSelectedTeacher(defaultValue.teacher);
      setNewFileName(defaultValue.filename);
      console.log(defaultValue);
    }
  },[]);
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '80%', // Set your desired width
            maxWidth: '600px', // Optional: Set a maximum width
          },
        }}
      >
        <DialogTitle>編輯</DialogTitle>
        <Box sx={{
          display: 'flex', flexDirection:'column',flexWrap: 'wrap', justifyContent: 'center', mb: 2,
        }}
        >
          <Box sx={{display: 'flex', flexDirection:'row',mb:2,justifyContent: 'center'}}>

          
          <FormControl sx={{ width: '40%', mx: 2 }}>
            <InputLabel sx={{ color: '#9DB2BF' }}>類型</InputLabel>
            <Select onChange={handleTypeChange} value={selectedType}>
              <MenuItem value="miderm">期中考</MenuItem>
              <MenuItem value="final">期末考</MenuItem>
              <MenuItem value="quiz">小考</MenuItem>
              <MenuItem value="hw">作業</MenuItem>
              <MenuItem value="others">其他</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '40%', mx: 2 }}>
            <InputLabel sx={{ color: '#9DB2BF' }}>學年</InputLabel>
            <Select onChange={handleYearChange} value={selectedYear}>
              {yearlist.map((year, index) => (
                <MenuItem key={index} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </Box>
          <Box sx={{display: 'flex', flexDirection:'row',justifyContent: 'center'}}>
          <FormControl sx={{ width: '40%' ,mx:2}}>
            <TextField label="教授"  onChange={handleTeacherChange} value={selectedTeacher}/>
          </FormControl>
          <FormControl sx={{ width: '40%',mx:2 }}>
            <TextField label="檔名" onChange={handleFileNameChange} value={newFileName}/>
          </FormControl>
          
          </Box>
        </Box>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditFile}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
