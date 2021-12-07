import React from "react";
import MainHeader from "./header";
import { CssBaseline } from "@mui/material";
import Banner from "./home.banner";
import Cards from "./Cards";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import Footer from "./footer";

let mainTheme = createTheme({
  typography: { fontFamily: "Roboto" },
  palette: {
    primary: {
      main: "#20b2aa",
    },
  },
});

function Homepage() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <MainHeader />
        <Banner />
        <Box sx={{ m: 2, p: 5 }}>
          <Cards />
        </Box>
        <Box sx={{ m: 2, p: 5 }}>
          <Cards />
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Homepage;
