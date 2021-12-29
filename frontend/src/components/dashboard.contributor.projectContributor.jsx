import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Grid,
  Tooltip,
  Link
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteContributor } from "../reducers/actions/contributors";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import {useHistory} from "react-router-dom"

const MAX_TEAMS = 2;

function ProjectContributor({
  firstName,
  lastName,
  id,
  teams = [],
  owner,
  tasks = [],
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const params = useParams();
  const history =useHistory();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteContributor = () => {
    dispatch(deleteContributor({ projectId: params.id, contributorId: id }));
    handleMenuClose();
  };
  let teamsToDisplay = [];
  let tooltipString = "";
  if (teams) {
    for (let i = 0; i < Math.min(MAX_TEAMS, teams.length); i++) {
      teamsToDisplay.push(teams[i]);
    }

    if (teamsToDisplay.length !== teams.length) {
      for (let i = MAX_TEAMS; i < teams.length; i++) {
        if (i == teams.length - 1) tooltipString += teams[i];
        else tooltipString += teams[i] + ", ";
      }
    }
  }

  return (
    <>
      <Grid
        container
        sx={{
          p: 2,
          //   display: "flex",
          //   alignItems: "center",
          //   "& > *": {
          //     ml: 2,
          //   },
          "&:hover": {
            backgroundColor: "#eee",
          },
        }}
        rowGap={2}
      >
        <Grid container xs={11}>
          <Grid item container alignItems="center" xs={12} md={6}>
            <Avatar />
            <Typography variant="body1" sx={{ ml: 2, width: "50%" }}>
              {firstName + " " + lastName}
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={12}
            md={6}
            sx={{
              "& > .MuiChip-root:not(:first-child)": {
                ml: 1,
              },
              mt: {
                xs: 2,
                md: 0,
              },
            }}
          >
            <PeopleAltIcon
              sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
            />
            {teamsToDisplay.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ color: "#708090", opacity: "60%" }}
              >
                No Teams Assigned
              </Typography>
            ) : (
              teamsToDisplay.map((team) => {
                return <Chip label={team} variant="outlined"></Chip>;
              })
            )}
            {teamsToDisplay.length === 0 ? (
              <></>
            ) : teams.length !== teamsToDisplay.length ? (
              <Tooltip title={tooltipString}>
                <Chip label={`+${teams.length - teamsToDisplay.length}`} />
              </Tooltip>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" xs={1}>
          {owner && (
            <Box>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          )}
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ProfileIcon sx={{ color: "gray", mr: "4px" }} />
              Open Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDeleteContributor}>
              <DeleteIcon sx={{ color: "red", opacity: "50%", mr: "4px" }} />
              <Typography sx={{ color: "red" }}>Remove User</Typography>
            </MenuItem>
          </Menu>
        </Grid>
        {tasks.map((task) => {
          return (
            <>
              <Grid item container alignItems="center" justifyContent="center" xs={1}>
                <WorkOutlineOutlinedIcon />
              </Grid>
              <Grid item xs={11}>
                <Link 
                underline="none"
                sx={{
                  color: 'black',
                  ":hover": {
                    cursor: 'pointer',
                    color: 'lightseagreen'
                  }
                }} onClick={() => {history.push(`/projects/${params.id}/task/${task._id}`)}} >
                <Typography>{task.name}</Typography>
                </Link>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default ProjectContributor;
