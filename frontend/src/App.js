import React from "react";
import MainHeader from "./components/header";
import { CssBaseline } from "@mui/material";
import Banner from "./components/home.banner";
import Cards from "./components/Cards";
import Header from "./components/dashboard.header";
import Navbar from "./components/dashboard.navbar";
import Announcements from "./components/dashboard.announcements";
import Schedule from "./components/dashboard.schedule";
import Projects from "./components/projects";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage";
import Chat from "./components/chat";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Box } from "@mui/system";
import Footer from "./components/footer";
import Contributors from "./components/dashboard.contributors";
import Tasks from "./components/dashboard.tasks";
import NewTask from "./components/dashboard.newTask";
import { teal } from "@mui/material/colors";

let mainTheme = createTheme({
  typography: { fontFamily: "Roboto" },
  palette: {
    primary: {
      main: teal[400],
    },
  },
});

mainTheme = responsiveFontSizes(mainTheme);

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route path="/projects/" element={<Projects/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/contactus" element={<ContactUs/>} />
            <Route path="/chattingroom" element={<Chat/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      {/* <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Header HandleMobileClose={HandleMobileClose} />
        <Box component="div" sx={{ display: "flex" }}>
          <Navbar
            mobileOpen={mobileOpen}
            HandleMobileClose={HandleMobileClose}
          />
          <Schedule />
        </Box> */}
      {/* <MainHeader />
        <Banner />
        <Box sx={{ m: 2, p: 5 }}>
          <Cards />
        </Box>
        <Box sx={{ m: 2, p: 5 }}>
          <Cards />
        </Box>
        <Projects/>
        <Footer/> */}
      {/* </ThemeProvider> */}

      {/* <Contributors/> */}
{/* 
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <NewTask />
        <Tasks/>
        <Announcements />
      </ThemeProvider> */}
    </>
  );
}

export default App;
