import React from "react";
import { Link ,useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
function Home() {
  const navigation = useNavigate();
  return (
    <div className="App">
        <Typography variant="h1">成大資工考古題系統</Typography>
        <Button variant="contained" onClick={()=>navigation(`/main`)}>訪客參觀</Button>
        <Button variant="contained" onClick={()=>navigation(`/main`)}>訪客參觀</Button>   

    </div>
  );
}
export default Home;
