import React from "react";
import Navbar from "./dashboard.navbar";
import { Box } from "@mui/system";
import Header from "./header";
import {Typography} from "@mui/material";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

function Reports() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <Box
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
          component="form"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              "& > *": {
                mr: 2,
              },
              borderBottom: 1,
              borderColor: "lightgray",
              width: "100%",
            }}
          >
            <InsertChartOutlinedIcon fontSize="large" />
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Project Reports
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Reports;
