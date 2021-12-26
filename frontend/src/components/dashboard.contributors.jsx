import React from "react";
import Navbar from "./dashboard.navbar";
import ContributorsImp from "./dashboard.contributors.imp";
import { Box } from "@mui/system";
import Header from "./header";

function Contributors() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <ContributorsImp />
      </Box>
    </>
  );
}

export default Contributors;
