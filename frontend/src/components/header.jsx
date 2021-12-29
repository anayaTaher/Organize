import React, { useContext } from "react";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Logo from "../assets/logo/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ProjectsIcon from "@mui/icons-material/Task";
import ContactUsIcon from "@mui/icons-material/Phone";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { auth, db } from "../firebase";
import { AuthContext } from "./auth";
import { useHistory } from "react-router-dom";
import { teal } from "@mui/material/colors";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import LogoWhite from "../assets/logo/logowhite.png";
import { Box } from "@mui/system";
import { getAccountData } from "../reducers/actions/action";
import { useDispatch, useSelector } from "react-redux";

const HeaderTheme = createTheme({
  palette: {
    primary: {
      main: "#708090",
    },
  },
});

function Header({ flag = true, navbarMobile }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const history = useHistory();
  const logout = async () => {
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({ isOnline: false });
    await auth.signOut();
    localStorage.removeItem("token");
    history.push("/");
  };
  const { user } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAccountData());
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
        <ToolBar sx={{ backgroundColor: flag ? "white" : teal[400] }}>
          <ToolBar sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {flag && (
              <>
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
                {user && (
                  <Link
                    href="/projects"
                    underline="none"
                    variant="h6"
                    sx={{ mr: 5, fontWeight: 500 }}
                  >
                    Projects
                  </Link>
                )}
                {user && (
                  <Link
                    href="/contactus"
                    underline="none"
                    variant="h6"
                    sx={{ mr: 5, fontWeight: 500 }}
                  >
                    Contact Us
                  </Link>
                )}
              </>
            )}
          </ToolBar>
          {flag ? (
            <>
              <ToolBar
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <IconButton sx={{ mr: 2 }} onClick={HandleMobileClose}>
                  <MenuIcon />
                </IconButton>
              </ToolBar>
            </>
          ) : (
            <>
              <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
                <IconButton
                  sx={{ mr: 2, color: "white" }}
                  onClick={navbarMobile}
                >
                  <MenuIcon />
                </IconButton>
                <Avatar alt="Organize" src={LogoWhite} />
              </Box>
            </>
          )}
          {user && (
            <ToolBar sx={{ justifyContent: "flex-end" }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick}>
                  <Avatar src={currentUser?.image} alt="/o/" />
                </IconButton>
              </Tooltip>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography
                  variant="body2"
                  sx={{ color: flag ? "black" : "white", ml: 1 }}
                >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
              </Box>
            </ToolBar>
          )}
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
          {user && (
            <>
              <Link href="/projects" color="#000000" underline="none">
                <ListItem>
                  <ListItemButton>
                    <ProjectsIcon sx={{ mr: 1 }} />
                    Projects
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
            </>
          )}

          {user && (
            <>
              <Link href="/contactus" color="#000000" underline="none">
                <ListItem>
                  <ListItemButton>
                    <ContactUsIcon sx={{ mr: 1 }} />
                    Contact Us
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
            </>
          )}
        </List>
      </Drawer>
      {user !== null && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 23,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar src={currentUser?.image} /> Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </ThemeProvider>
  );
}

export default Header;
