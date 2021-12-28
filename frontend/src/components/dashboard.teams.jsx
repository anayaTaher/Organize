import React from "react";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  Checkbox,
  Chip,
} from "@mui/material";
import Navbar from "./dashboard.navbar";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributors } from "../reducers/actions/contributors";
import { useParams, useHistory } from "react-router-dom";
import { fetchTeams } from "../reducers/actions/teams";
import Header from "./header";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import teal from "@mui/material/colors/teal";
import ProjectContributor from "./dashboard.contributor.projectContributor";
import { isProjectOwner } from "../reducers/actions/projects";
import {fetchTasks} from "../reducers/actions/tasks";
import TaskRow from "./dashboard.tasks.taskRow";

function Teams() {
  const contributors = useSelector((state) => state.contributors);
  const teams = useSelector((state) => state.teams);
  const owner = useSelector((state) => state.owner);
  const tasks = useSelector((state) => state.tasks);
  const [selectedTeam, setSelectedTeam] = React.useState("");
  const [displayedContributors, setDisplayedContributors] = React.useState([]);
  const [displayedTasks, setDisplayedTasks] = React.useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(fetchContributors({ projectId: params.id }));
    dispatch(fetchTeams({ projectId: params.id }));
    dispatch(isProjectOwner({ projectId: params.id }));
    dispatch(fetchTasks({projectId: params.id}));
  }, [dispatch]);

  React.useEffect(() => {
    if (selectedTeam === "") {
      setDisplayedContributors([]);
      setDisplayedTasks([]);
      return;
    }
    const desiredTeam = teams.find((team) => team._id === selectedTeam);
    const searchedValue = contributors.filter((contributor) => {
      if (contributor.teams.includes(desiredTeam.name)) return contributor;
    });
    console.log(searchedValue);
    setDisplayedContributors(searchedValue);
    setDisplayedTasks(tasks.filter(task=>task.teams.includes(selectedTeam)));
  }, [selectedTeam]);


  const handleTeamChange = (id) => () => {
    if (selectedTeam === id) {
      setSelectedTeam("");
      return;
    }
    setSelectedTeam(id);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <Box
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
          component="form"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              "& > *": {
                mr: 2,
              },
              borderBottom: 1,
              borderColor: "lightgray",
              width: "100%",
            }}
          >
            <PeopleAltIcon fontSize="large" />
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Availabe Teams
            </Typography>
          </Box>
          <Box sx={{ padding: 2, width: "100%", display: "flex" }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Select a Team to Inspect:
            </Typography>
            {owner && <><Button
              sx={{ display: { xs: "none", md: "block" } }}
              variant="contained"
              disabled={selectedTeam === ""}
              onClick={() => history.push(`/projects/${params.id}/editTeam/${selectedTeam}`)}
            >
              Modify Selected Team
            </Button>
            <Button
              sx={{ display: { xs: "block", md: "none" } }}
              variant="contained"
              disabled={selectedTeam === ""}
              onClick={() => history.push(`/projects/${params.id}/editTeam/${selectedTeam}`)}
            >
              Modify
            </Button></>}
          </Box>
          <Box sx={{ display: "flex", "& > *": { ml: 2 } }}>
            {teams.map((team) => {
              return (
                <Box>
                  <Chip
                    sx={{
                      ":hover": { cursor: "pointer" },
                      color: selectedTeam === team._id ? teal[400] : "black",
                      borderColor:
                        selectedTeam === team._id ? teal[400] : "gray",
                    }}
                    onClick={handleTeamChange(team._id)}
                    key={team._id}
                    variant="outlined"
                    label={team.name}
                  ></Chip>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Associated Contributors:
            </Typography>
          </Box>
          {displayedContributors.length === 0 ? (
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#708090", opacity: "60%" }}
              >
                {selectedTeam === ""
                  ? "Select a Team to Inspect Contributors"
                  : "No Contributors Assigned to the Selected Team"}
              </Typography>
            </Box>
          ) : (
            displayedContributors.map((contributor) => {
              return (
                <ProjectContributor
                  key={contributor._id}
                  id={contributor._id}
                  firstName={contributor.firstName}
                  lastName={contributor.lastName}
                  teams={contributor.teams}
                  owner={owner}
                />
              );
            })
          )}
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Associated Tasks:
            </Typography>
          </Box>
          {displayedTasks.length === 0 ? (
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#708090", opacity: "60%" }}
              >
                {selectedTeam === ""
                  ? "Select a Team to Inspect Task"
                  : "No Tasks Assigned to the Selected Team"}
              </Typography>
            </Box>
          ) : (
            displayedTasks.map((task) => {
              let state = "notStarted";
              const deadlineDate = new Date(Date.parse(task.deadline));
              const today = new Date();
              const actuallyToday = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
              );

              let progress = 0;
              let isAnyInProgress = false;
              task.subtasks.forEach((subtask) => {
                if (subtask.inProgress) isAnyInProgress = true;
              });
              if (isAnyInProgress) state = "inProgress";
              task.subtasks.forEach((subtask) => {
                if (subtask.done) {
                  progress += subtask.weight;
                }
              });
              progress = (100 * progress) / task.weight;
              task.dependsOn.forEach((taskId) => {
                const foundTask = tasks.find((dtask) => dtask._id === taskId);
                if (foundTask && !foundTask.done) state = "onHold";
              });
              if (deadlineDate.getTime() < actuallyToday.getTime()) {
                state = "behind";
              }
              if (task.done) {
                state = "done";
                progress = 100;
              }
              return (
                <TaskRow
                  taskName={task.name}
                  taskDeadline={task.deadline}
                  taskProgress={progress}
                  taskWeight={task.weight}
                  taskState={state}
                  taskTeam={task.teams}
                  allTeams={teams}
                  taskId={task._id}
                  owner={owner}
                />
              );
            })
          )}
        </Box>
      </Box>
    </>
  );
}

export default Teams;
