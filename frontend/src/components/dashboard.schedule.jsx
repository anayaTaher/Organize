import React from "react";
import Header from "./dashboard.header";
import Navbar from "./dashboard.navbar";
import ScheduleImp from "./dashboard.schedule.imp";
import { Box } from "@mui/system";
function Schedule() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header HandleMobileClose={HandleMobileClose} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <ScheduleImp />
      </Box>
    </>
  );
}

export default Schedule;
