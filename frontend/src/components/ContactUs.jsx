import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "./header";
import { Button, CssBaseline } from "@mui/material";

export default function ContactUs() {
  return (
    <>
    <CssBaseline/>
      <MainHeader />
      <Button
        variant="contained"
        onClick={() => toast("This Is Contact Us Page")}
      >
        Click Me
      </Button>
      <ToastContainer />
    </>
  );
}
