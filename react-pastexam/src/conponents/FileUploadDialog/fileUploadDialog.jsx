import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useCallback } from 'react';
import { Slide } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const FileUploadDialog = ({ dialogOpen, setDialogOpen }) => {
    const yearlist = [112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 101];
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClickOpen = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    }, []);

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} timeout={{ enter: 800 }} />;
    });

    return (
        <div>
            <Dialog open={dialogOpen} onClose={handleClose} TransitionComponent={Transition}
                PaperProps={{
                    sx: {
                        width: '80%', // Set your desired width
                        maxWidth: '600px', // Optional: Set a maximum width
                    }
                }}
            >
                <DialogTitle>上傳考古題</DialogTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',mb:2 }}>
                    <FormControl sx={{ width: "25%", mr: 2 }}>
                        <InputLabel sx={{ color: "#9DB2BF" }}>類型</InputLabel>
                        <Select>
                            <MenuItem value='miderm'>期中考</MenuItem>
                            <MenuItem value='final'>期末考</MenuItem>
                            <MenuItem value='quiz'>小考</MenuItem>
                            <MenuItem value='hw'>作業</MenuItem>
                            <MenuItem value='others'>其他</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "15%", mr: 2 }}>
                        <InputLabel sx={{ color: "#9DB2BF" }}>學年</InputLabel>
                        <Select>
                            {yearlist.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "15%", mr: 2 }}>
                        <InputLabel sx={{ color: "#9DB2BF" }}>學期</InputLabel>
                        <Select>
                            <MenuItem value='1'>上</MenuItem>
                            <MenuItem value='2'>下</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "25%" }}>
                        <TextField placeholder='教授' />
                    </FormControl>
                </Box>

                <DialogContent
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    sx={{
                        border: '2px dashed #90caf9',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: '#90caf9',
                    }}
                >
                    <Typography variant="body1">Drag and drop a file here, or click to select a file</Typography>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload-input"
                    />
                    <label htmlFor="file-upload-input">
                        <Button variant="contained" component="span" sx={{ mt: 2 }}>
                            Choose File
                        </Button>
                    </label>
                    {selectedFile && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Selected file: {selectedFile.name}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FileUploadDialog;
