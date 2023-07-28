import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {api} from "../../credential";

export const Table = () => {
    const [files, setFiles] = useState();
    const fetchFile = async (id) => {
        const res = await axios.get(`${api}/main/${id}`);
        setFiles(res.data);
    }
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    useEffect(() => {
        fetchFile(id);
    }, [id]);
    return (
        <h1>
            {files}
        </h1>
    )
}
