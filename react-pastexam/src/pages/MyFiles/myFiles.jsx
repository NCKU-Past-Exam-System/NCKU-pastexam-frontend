import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Table } from "../../conponents/Table/table";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import { Footer } from "../../conponents/Footer/footer";
import { MyFileTable } from "../../conponents/MyFileTable/myFileTable";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { darkTheme,ButtonStyle } from "./style";
import { api } from "../../credential";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {FileUploadDialog} from "../../conponents/FileUploadDialog/fileUploadDialog";
import {Loading} from "../../conponents/Loading/loading";
export const MyFiles = () => {
    const location = useLocation();
    const courseUid = location.pathname.split('/')[2];
    const [courseInfo, setCourseInfo] = React.useState({});
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#080808',
          }}>
          <Navbar />
          <Box
            sx={{
              paddingTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              {loading ? <Loading /> : null}
              <MyFileTable setLoading={setLoading} />
            </Box>
          </Box>
          <Footer />
        </Box>
        <Box></Box>
      </ThemeProvider>
    );
}