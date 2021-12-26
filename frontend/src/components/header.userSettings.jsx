import React from "react";
import {
  Avatar,
  IconButton,
  Divider,
  Tooltip,
  MenuItem,
  Menu,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ToolBar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import Logo from "../assets/logo/logo.png";
import Notifications from "@mui/icons-material/Notifications";
import Mail from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserSettings() {
  const history = useHistory();
  const account = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <>
      <ToolBar sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Avatar src={Logo} alt="/o/" sx={{ mr: 5, height: 50, width: 50 }} />
      </ToolBar>
      <ToolBar sx={{ justifyContent: "flex-end" }}>
        <IconButton sx={{ mr: 1, color: "#708090" }}>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton sx={{ mr: 2, color: "#708090" }}>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick}>
            <Avatar src={Logo} alt="/o/" />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" sx={{ color: "black" }}>
          {account.firstName + " " + account.lastName}
        </Typography>
      </ToolBar>
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
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My Account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add Another Account
        </MenuItem>
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
    </>
  );
}

export default UserSettings;
