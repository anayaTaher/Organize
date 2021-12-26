import React from "react";
import MainHeader from "./components/header";
import { CssBaseline } from "@mui/material";
import Banner from "./components/home.banner";
import Cards from "./components/Cards";
import Header from "./components/dashboard.header";
import Navbar from "./components/dashboard.navbar";
import Announcements from "./components/dashboard.announcements";
import NewTeam from "./components/dashboard.newTeam";
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
import Announcement from "@mui/icons-material/Announcement";

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
            <Route path="/projects/:id" element={<Schedule/>} />
            <Route path="/projects/:id/announcements" element={<Announcements/>} />
            <Route path="/projects/:id/tasks" element={<Tasks/>} />
            <Route path="/projects/:id/contributors" element={<Contributors/>} />
            <Route path="/projects/:id/newTask" element={<NewTask/>} />
            <Route path="/projects/:id/newTeam" element={<NewTeam/>} />
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
