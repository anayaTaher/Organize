import React from "react";
import Navbar from "./dashboard.navbar";
import NewTaskImp from "./dashboard.newTask.imp";
import { Box } from "@mui/system";
import Header from "./header";

function NewTask() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <NewTaskImp />
      </Box>
    </>
  );
}

export default NewTask;
