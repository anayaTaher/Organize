import React from "react";
import MainHeader from "./header";
import ProjectsMain from "./projects.main";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./footer";

let mainTheme = createTheme({
  typography: { fontFamily: "Roboto" },
  palette: {
    primary: {
      main: "#20b2aa",
    },
  },
});

function Projects() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <MainHeader />
        <ProjectsMain />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Projects;
