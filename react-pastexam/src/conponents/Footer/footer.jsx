import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor:'#040D12',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h6" color={"#DDE6ED"} align="center">
          聯絡我們：f74116194@gs.ncku.edu.tw<br/>
          Made by Owen
          <br/>
          <Link href="https://github.com/owenowenisme" sx={{color:'white'}}><GitHubIcon color="white" fontSize="large"/></Link>
        </Typography>
        
      </Container>
    </Box>
  );
}
