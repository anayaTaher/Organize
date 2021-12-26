import React, { useEffect } from "react";
import {
  Avatar,
  IconButton,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Tooltip,
  MenuItem,
  Menu,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import Logo from "./../assets/logo/logo.png";
import Notifications from "@mui/icons-material/Notifications";
import Mail from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ProjectsIcon from "@mui/icons-material/Task";
import ContactUsIcon from "@mui/icons-material/Phone";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchName } from "../reducers/actions/action";
import axios from "axios";
import jwt from "jsonwebtoken";
import UserSettings from "./header.userSettings";
import { getAccountData } from "../reducers/actions/action";

const HeaderTheme = createTheme({
  palette: {
    primary: {
      main: "#708090",
    },
  },
});

function Header() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => {
    setMobileOpen(!mobileOpen);
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  };

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  React.useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        return;
      }
      const decodedAccount = jwt.decode(token.token);
      if (decodedAccount.exp * 1000 < new Date().getTime()) {
        logOut();
        return;
      }
      dispatch(getAccountData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={HeaderTheme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFF",
          boxShadow: 0,
        }}
      >
        <ToolBar>
          <IconButton
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={HandleMobileClose}
          >
            <MenuIcon />
          </IconButton>
          <ToolBar sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Avatar
              src={Logo}
              alt="/o/"
              sx={{ mr: 5, height: 50, width: 50 }}
            />
            <Link
              href="/"
              underline="none"
              variant="h6"
              sx={{ mr: 5, fontWeight: 500 }}
            >
              Home
            </Link>
            <Link
              href="/projects"
              underline="none"
              variant="h6"
              sx={{ mr: 5, fontWeight: 500 }}
            >
              Projects
            </Link>
            <Link
              href="/contactus"
              underline="none"
              variant="h6"
              sx={{ mr: 5, fontWeight: 500 }}
            >
              Contact Us
            </Link>
          </ToolBar>
          {isLoggedIn() ? <UserSettings /> : <Button />}
        </ToolBar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="top"
        sx={{
          display: { xs: "block", md: "none" },
        }}
        open={mobileOpen}
        onClose={HandleMobileClose}
      >
        <List>
          <Link href="/" color="#000000" underline="none">
            <ListItem>
              <ListItemButton>
                <HomeIcon sx={{ mr: 1 }} />
                Home
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link href="/projects" color="#000000" underline="none">
            <ListItem>
              <ListItemButton>
                <ProjectsIcon sx={{ mr: 1 }} />
                Projects
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link href="/contactus" color="#000000" underline="none">
            <ListItem>
              <ListItemButton>
                <ContactUsIcon sx={{ mr: 1 }} />
                Contact Us
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default Header;
