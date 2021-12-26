import React from "react";
import Header from "./dashboard.header";
import Navbar from "./dashboard.navbar";
import NewTaskImp from "./dashboard.newTask.imp";
import { Box } from "@mui/system";

function NewTask() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <NewTaskImp />
      </Box>
    </>
  );
}

export default NewTask;
