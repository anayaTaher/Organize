import React from "react";
import Navbar from "./dashboard.navbar";
import TasksImp from "./dashboard.tasks.imp";
import { Box } from "@mui/system";
import Header from "./header";

function Tasks() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <TasksImp />
      </Box>
    </>
  );
}

export default Tasks;
