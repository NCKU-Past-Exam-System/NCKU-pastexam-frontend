import React, { useEffect } from "react";
import { Sidebar } from "../../conponents/Sidebar/sidebar";
import { MainWrapper } from "./style";
import { Table } from "../../conponents/Table/table";


export const Main = () => {
    return (

        <MainWrapper>
            <Sidebar />
            <Table />
        </MainWrapper>

    )
}