import React from "react";
import { AppBar, Toolbar, IconButton, Avatar, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoWhite from "./../assets/logo/logowhite.png";
import Logo from "./../assets/logo/logo.png";
import Notifications from "@mui/icons-material/Notifications";
import Mail from "@mui/icons-material/Mail";
import { Box } from "@mui/system";

function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Toolbar sx={{ flexGrow: 1 }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              sx={{ mr: 2, color: "white" }}
              onClick={props.HandleMobileClose}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Avatar
            alt="Organize"
            src={LogoWhite}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          />
        </Toolbar>
        <Toolbar sx={{justifyContent: 'flex-end'}}>
          <IconButton sx={{ mr: 1, color: "white" }}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton sx={{ mr: 2, color: "white" }}>
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Avatar src={Logo} alt="/o/"/>
          </IconButton>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
