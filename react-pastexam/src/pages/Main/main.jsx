import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Table } from "../../conponents/Table/table";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import {Footer} from "../../conponents/Footer/footer";
export const Main = () => {
    return (
        <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column' ,backgroundColor:'#040D12'}}>
            <Box sx={{ display: 'flex' ,backgroundColor:'#040D12'}} >
                <Navbar />
                <Sidebar />
                <Table />
            </Box>
            <Footer />
        </Box>
    )
}