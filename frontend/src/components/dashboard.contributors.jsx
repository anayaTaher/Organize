import React from "react";
import Header from "./dashboard.header";
import Navbar from "./dashboard.navbar";
import ContributorsImp from "./dashboard.contributors.imp";
import { Box } from "@mui/system";

function Contributors() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
        <Header HandleMobileClose={HandleMobileClose} />
        <Box component="div" sx={{ display: "flex" }}>
          <Navbar
            mobileOpen={mobileOpen}
            HandleMobileClose={HandleMobileClose}
          />
          <ContributorsImp />
        </Box>
    </>
  );
}

export default Contributors;
