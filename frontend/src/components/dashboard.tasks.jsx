import React from "react";
import Header from "./dashboard.header";
import Navbar from "./dashboard.navbar";
import TasksImp from "./dashboard.tasks.imp";
import { Box } from "@mui/system";

function Tasks() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <TasksImp />
      </Box>
    </>
  );
}

export default Tasks;
