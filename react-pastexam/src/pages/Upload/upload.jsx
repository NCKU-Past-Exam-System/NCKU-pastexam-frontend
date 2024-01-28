import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { api } from "../../credential";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Button, Input } from "@mui/material";
import { Navbar } from "../../conponents/Navbar/navbar";
import { googleLogout } from "@react-oauth/google";
import { Padding } from "@mui/icons-material";
export const Upload = () => {
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedType, setSelectedType] = useState();
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${api}/courselist?key=grade`);
      setCourses(res.data);
    };
    fetchData();

  }, []);
  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const handleUpload = () => {
    const formData = new FormData();
    const courseTeacher = document.getElementById("teacher").value;
    const courseYear = document.getElementById("year").value || 0;
    if (selectedCourse == undefined || selectedType == undefined || courseTeacher == undefined || courseYear == undefined) {
      alert("請填寫完整資料");
      return;
    }
    if (file == undefined) {
      alert("請選擇檔案");
      return;
    }
    formData.append('file', file);
    axios.post(`${api}/uploadfile/?course_id=${selectedCourse}&year=${courseYear}&examtype=${selectedType}&teacher=${courseTeacher}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': sessionStorage.getItem('token'),
      }
    }).then((res) => {
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
        googleLogout();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('info');
        window.location.reload();
      }

    }
    );
  }
  return (
    <div>
      <Navbar />
      <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, paddingTop: "80px" }}>
        <FormControl sx={{ color: '#9DB2BF' }}>
          <InputLabel sx={{color: "#9DB2BF"}}>Course</InputLabel>
          <Select
            labelId="course-label"
            id="demo-simple-select"
            value={selectedCourse}
            label="course"
            required="true"
            onChange={handleCourseChange}
            sx={{
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
              }
            }}
          >
            {courses.map((course) => (
              <MenuItem value={course.id}>{course.course}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel sx={{ color: "#9DB2BF" }}>Type</InputLabel>
          <Select
            labelId="type-label"
            labelStyle={{ color: '#ff0000' }}
            id="type"
            value={selectedType}
            label="type"
            required="true"
            onChange={handleTypeChange}
            sx={{
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
              }
            }}
          >
            <MenuItem value={'期中考'}>期中考</MenuItem>
            <MenuItem value={'期末考'}>期末考</MenuItem>
            <MenuItem value={'小考'}>小考</MenuItem>
            <MenuItem value={'其他'}>其他</MenuItem>
          </Select>
        </FormControl>
        <FormControl >
          <TextField id="teacher" label="教授" variant="outlined" required="true"
            InputLabelProps={{
              style: { color: "#9DB2BF" }
            }}
            sx={{
              input: { color: 'white' },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
              }
            }} />
        </FormControl>
        <FormControl>
          <TextField id="year" type="number" label="學年度" variant="outlined" required="true"
            InputLabelProps={{
              style: { color: "#9DB2BF" }
            }}
            sx={{
              input: { color: 'white' },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
              }
            }} />
        </FormControl>
      </Box>
      <Input type="file"
        sx={{ color: '#9DB2BF' }}
        inputProps={{ accept: ["application/zip", "application/pdf", "application/msword", "text/plain", "image/*", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] }}
        onChange={
          (e) => {
            console.log(e.target.files[0]);
            if (e.target.files[0].type.includes('image') || e.target.files[0].type.includes('pdf') || e.target.files[0].type.includes('text')
              || e.target.files[0].type.includes('zip') || e.target.files[0].type.includes('msword') || e.target.files[0].type.includes('powerpoint') || e.target.files[0].type.includes('officedocument')
            ) { setFile(e.target.files[0]) }
            else {
              alert("僅允許pdf,doc,ppt,zip以及圖片");
              e.target.value = null;
            }
          }
        }
      />
      <Button variant="contained" component="span" onClick={handleUpload} sx={{ backgroundColor: '#9DB2BF' }}>
        Upload
      </Button>
    </div>
  )
}  