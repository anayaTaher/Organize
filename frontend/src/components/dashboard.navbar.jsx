import {
  Toolbar,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Drawer,
  Divider,
  Typography,
  Badge,
  LinearProgress,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TaskIcon from "@mui/icons-material/Task";
import ContributorsIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AboutProjectIcon from "@mui/icons-material/Help";
import ProjectReportsIcon from "@mui/icons-material/Analytics";
import ProjectDetailsIcon from "@mui/icons-material/Business";
import NavigateIcon from "@mui/icons-material/Navigation";
import Logo from "./../assets/logo/logo.png";
import ProjectImage from "./../assets/images/fb.png";
import { Box } from "@mui/system";
const React = require("react");

const drawerWidth = 280;

const drawerItems = [
  {
    text: "Announcements",
    icon: AnnouncementIcon,
    isBadge: true,
    badgeContent: 2,
  },
  {
    text: "Tasks",
    icon: TaskIcon,
    isBadge: false,
    badgeContent: 0,
  },
  {
    text: "Settings",
    icon: SettingsIcon,
    isBadge: false,
    badgeContent: 0,
  },
  {
    text: "Contributors",
    icon: ContributorsIcon,
    isBadge: false,
    badgeContent: 0,
  },
  {
    text: "About Project",
    icon: AboutProjectIcon,
    isBadge: false,
    badgeContent: 0,
  },
  {
    text: "Project Reports",
    icon: ProjectReportsIcon,
    isBadge: false,
    badgeContent: 0,
  },
];

const getDrawerListItems = (drawerItems) => {
  return drawerItems.map((item) => (
    <ListItem key={item} sx={{ pb: 0, pt: 0 }}>
      <ListItemButton>
        <ListItemIcon>
          {item.isBadge ? (
            <>
              <Badge variant="dot" badgeContent={2} color="error">
                <item.icon sx={{ color: "#708090" }} />
              </Badge>
            </>
          ) : (
            <item.icon sx={{ color: "#708090" }} />
          )}
        </ListItemIcon>
        <ListItemText sx={{ color: "#708090" }} primary={item.text} />
      </ListItemButton>
    </ListItem>
  ));
};

const drawer = (
  <>
    <Divider />
    <List dense={true}>
      <ListItem>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <ProjectDetailsIcon
            sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
          />
          <Typography variant="overline" sx={{ color: "#708090" }}>
            Project Details
          </Typography>
          <Divider variant="middle" sx={{ flexGrow: 1 }} />
        </Box>
      </ListItem>
      <List dense={true}>
        <ListItem>
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}
          >
            <Avatar src={ProjectImage} sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ color: "#708090", fontWeight: 'bold' }} noWrap>
              Facebook
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="button" sx={{ color: "#708090", mr: 2 }}>
              Progress
            </Typography>
            <LinearProgress
              sx={{ flexGrow: 1 }}
              variant="determinate"
              value={37}
            />
          </Box>
        </ListItem>
        <ListItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="button" sx={{ color: "#708090" }}>
              Tasks Finished
            </Typography>
            <Typography variant="overline" sx={{ color: "#708090" }}>
              20/61
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="button" sx={{ color: "#708090" }}>
              Deadline
            </Typography>
            <Typography variant="overline" sx={{ color: "#708090" }}>
              2nd Oct 2021
            </Typography>
          </Box>
        </ListItem>
      </List>
      <ListItem sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <NavigateIcon
            sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
          />
          <Typography variant="overline" sx={{ color: "#708090" }}>
            Navigate
          </Typography>
          <Divider variant="middle" sx={{ flexGrow: 1 }} />
        </Box>
      </ListItem>
      {getDrawerListItems(drawerItems)}
    </List>
  </>
);

function Navbar(props) {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#f5f4f8",
          },
          display: { xs: "none", md: "block" },
        }}
      >
        <Toolbar>
          <Avatar
            alt="Organize"
            src={Logo}
            sx={{ mr: 1, display: { xs: "none", md: "block" } }}
          />
          <Typography variant="h6">Organize</Typography>
        </Toolbar>
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth },
          display: { xs: "block", md: "none" },
        }}
        open={props.mobileOpen}
        onClose={props.HandleMobileClose}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
