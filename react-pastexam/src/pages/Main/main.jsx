import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Table } from "../../conponents/Table/table";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientId } from "../../credential";
export const Main = () => {
    return (
        
        <Box sx={{ display: 'flex' }} >
             <Navbar />
                <Sidebar />
            <Table/>
        </Box>
    )
}