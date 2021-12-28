import React from "react";
import Navbar from "./dashboard.navbar";
import ScheduleImp from "./dashboard.schedule.imp";
import { Box } from "@mui/system";
import Header from "./header";

function Schedule() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <ScheduleImp />
      </Box>
    </>
  );
}

export default Schedule;
