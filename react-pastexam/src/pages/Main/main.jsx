import React from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { Table } from "../../conponents/Table/table";
import { Navbar } from "../../conponents/Navbar/navbar";
import { Box } from "@mui/system";
export const Main = () => {
    return (
        <Box sx={{ display: 'flex' }} >
            {console.log("main")}
             <Navbar />
                <Sidebar />
            <Table/>
        </Box>
    )
}