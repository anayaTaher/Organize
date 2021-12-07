import {
  Button,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import React from "react";
import { Box } from "@mui/system";

const TEAMS_TO_SHOW = 3;

function TaskRow(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  let taskIcon = <CheckIcon sx={{ color: "green" }} />;
  let taskTooltipTitle = "Task is complete";
  switch (props.taskState) {
    case "inProgress":
      taskIcon = <DoubleArrowIcon sx={{ color: "dodgerblue" }} />;
      taskTooltipTitle = "Task in progress";
      break;
    case "behind":
      taskIcon = <CloseIcon sx={{ color: "red" }} />;
      taskTooltipTitle = "Task is behind the schedule!";
      break;
    case "onHold":
      taskIcon = <MoreHorizIcon sx={{ color: "orange" }} />;
      taskTooltipTitle = "Prerequisit task is behind the schedule!";
      break;
    default:
      break;
  }

  let taskTeam = [];
  for (let i = 0; i < props.taskTeam.length; i++) {
    if (i === TEAMS_TO_SHOW) {
      const remainingTeams = "+" + (props.taskTeam.length - TEAMS_TO_SHOW);
      taskTeam.push(<Chip variant="filled" label={remainingTeams} />);
      break;
    }
    taskTeam.push(<Chip variant="outlined" label={props.taskTeam[i]} />);
  }

  return (
    <>
      <Grid
        container
        alignItems="center"
        padding={1}
        sx={{ "&:hover": { backgroundColor: "#eee" } }}
      >
        <Grid item container justifyContent="center" xs={0.5}>
          <Tooltip title={taskTooltipTitle}>{taskIcon}</Tooltip>
        </Grid>
        <Grid item container xs={4}>
          <Link
            href="#"
            underline="none"
            sx={{
              "&:hover": { textDecoration: "none", color: "lightseagreen" },
              color: "black",
            }}
          >
            <Typography variant="body1">{props.taskName}</Typography>
          </Link>
        </Grid>
        <Grid item xs={3} sx={{ "& > *": { mr: 1 } }}>
          {taskTeam}
        </Grid>
        <Grid item container justifyContent="center" xs={1}>
          <Typography sx={{ color: "#708090" }} variant="body1">
            {props.taskWeight}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <LinearProgress variant="determinate" value={props.taskProgress} />
        </Grid>
        <Grid item container justifyContent="center" xs={1.5}>
          <Typography variant="body1" sx={{ color: "#708090" }}>
            {props.taskDeadline.toDateString()}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" xs={1}>
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > *": { mr: 2 },
                }}
              >
                <EditIcon />
                <Typography>Edit Task</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleModalOpen}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > *": { mr: 2 },
                }}
              >
                <DeleteIcon />
                <Typography>Delete Task</Typography>
              </Box>
            </MenuItem>
          </Menu>
          <Modal open={modalOpen} onClose={handleModalClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                p: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                Are you sure you want to remove this task?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: 2,
                  px: "20%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ color: "white" }}
                  onClick={handleModalClose}
                >
                  Delete
                </Button>
                <Button variant="outlined" onClick={handleModalClose}>
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </>
  );
}

export default TaskRow;
