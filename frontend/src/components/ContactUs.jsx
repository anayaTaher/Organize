import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, CssBaseline } from "@mui/material";
import Header from "./header";

export default function ContactUs() {
  return (
    <>
    <CssBaseline/>
    <Header flag={true}/>
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
