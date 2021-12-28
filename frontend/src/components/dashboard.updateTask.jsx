import React from "react";
import Navbar from "./dashboard.navbar";
import UpdateTaskImp from "./dashboard.updateTask.imp";
import { Box } from "@mui/system";
import Header from "./header";

function UpdateTask() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <UpdateTaskImp />
      </Box>
    </>
  );
}

export default UpdateTask;
