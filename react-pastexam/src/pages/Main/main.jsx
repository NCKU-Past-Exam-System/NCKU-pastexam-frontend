import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Table } from "../Table/table";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import {Footer} from "../../conponents/Footer/footer";
export const Main = () => {
    return (
        <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column' ,backgroundColor:'#080808'}}>
            <Box sx={{ display: 'flex' ,backgroundColor:'#080808'}} >
                <Navbar />
            </Box>
            <Footer />
        </Box>
    )
}