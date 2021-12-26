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
import Logo from "../assets/logo/logo.png";
import ProjectImage from "../assets/images/fb.png";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
const React = require("react");

const drawerWidth = 280;

const drawerItems = [
  {
    text: "Announcements",
    icon: AnnouncementIcon,
    isBadge: true,
    badgeContent: 2,
    href: "announcements",
  },
  {
    text: "Calendar",
    icon: CalendarTodayIcon,
    isBadge: false,
    href: "",
  },
  {
    text: "Tasks",
    icon: TaskIcon,
    isBadge: false,
    badgeContent: 0,
    href: "tasks",
  },
  {
    text: "New Task",
    icon: AddIcon,
    isBadge: false,
    href: "newTask",
  },

  // {
  //   text: "Settings",
  //   icon: SettingsIcon,
  //   isBadge: false,
  //   badgeContent: 0,
  //   href: "#",
  // },
  {
    text: "Contributors",
    icon: GroupsIcon,
    isBadge: false,
    badgeContent: 0,
    href: "contributors",
  },
  {
    text: "Teams",
    icon: ContributorsIcon,
    isBadge: false,
    href: "teams",
  },
  {
    text: "New Team",
    icon: GroupAddIcon,
    isBadge: false,
    href: "newTeam",
  },
  // {
  //   text: "About Project",
  //   icon: AboutProjectIcon,
  //   isBadge: false,
  //   badgeContent: 0,
  //   href: "#",
  // },
  // {
  //   text: "Project Reports",
  //   icon: ProjectReportsIcon,
  //   isBadge: false,
  //   badgeContent: 0,
  //   href: "#",
  // },
];

function Navbar(props) {
  const history = useHistory();
  const params = useParams();
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  width: "100%",
                }}
              >
                <Avatar src={ProjectImage} sx={{ mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#708090", fontWeight: "bold" }}
                  noWrap
                >
                  Facebook
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
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
          {drawerItems.map((item) => (
            <ListItem key={item} sx={{ pb: 0, pt: 0 }}>
              <ListItemButton
                onClick={() => history.push(`/projects/${params.id}/${item.href}`)}
              >
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
          ))}
        </List>
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  width: "100%",
                }}
              >
                <Avatar src={ProjectImage} sx={{ mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#708090", fontWeight: "bold" }}
                  noWrap
                >
                  Facebook
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
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
          {drawerItems.map((item) => (
            <ListItem key={item} sx={{ pb: 0, pt: 0 }}>
              <ListItemButton
                onClick={() => history.push(`/projects/${params.id}/${item.href}`)}
              >
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
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
