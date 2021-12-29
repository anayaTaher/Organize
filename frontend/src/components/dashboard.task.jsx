import React from "react";
import Header from "./header";
import Navbar from "./dashboard.navbar";
import TaskIcon from "@mui/icons-material/Task";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Checkbox,
  Avatar,
  Button,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTasks,
  updateProgress,
  updateDone,
  toggleTaskDone,
} from "../reducers/actions/tasks";
import { fetchTeams } from "../reducers/actions/teams";
import { fetchContributors } from "../reducers/actions/contributors";
import { isProjectOwner } from "../reducers/actions/projects";
import { useHistory } from "react-router-dom";

function Task() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const contributors = useSelector((state) => state.contributors);
  const [currentTask, setCurrentTask] = React.useState();
  const params = useParams();
  const teams = useSelector((state) => state.teams);
  const isOwner = useSelector((state) => state.owner);
  const history = useHistory();

  React.useEffect(() => {
    console.log(contributors);
  }, [contributors]);

  const getStateColor = (state) => {
    let color = "green";
    switch (state) {
      case "inProgress":
        color = "dodgerblue";
        break;
      case "behind":
        color = "red";
        break;
      case "onHold":
        color = "orange";
        break;
      case "notStarted":
        color = "gray";
        break;
      default:
        break;
    }
    return color;
  };

  const getStateText = (state) => {
    let text = "Task is complete";
    switch (state) {
      case "inProgress":
        text = "Task in progress";
        break;
      case "behind":
        text = "Task is behind the schedule!";
        break;
      case "onHold":
        text = "Prerequisit task is not complete";
        break;
      case "notStarted":
        text = "Task has not been worked on yet";
        break;
      default:
        break;
    }
    return text;
  };

  const getTaskState = (task) => {
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
    return state;
  };

  React.useEffect(() => {
    dispatch(fetchTasks({ projectId: params.id, taskId: params.tid }));
    dispatch(fetchTeams({ projectId: params.id }));
    dispatch(fetchContributors({ projectId: params.id }));
    dispatch(isProjectOwner({ projectId: params.id }));
  }, [dispatch]);

  React.useEffect(() => {
    const val = tasks.find((t) => t._id === params.tid);
    setCurrentTask(tasks.find((t) => t._id === params.tid));
  }, [tasks]);

  const getDate = (task) => {
    const date = new Date(Date.parse(task.deadline));
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  };

  const getWorkerName = (id) => {
    if (id === "0") {
      return "None";
    } else {
      const user = contributors.find((cont) => cont._id === id);
      return `${user.firstName} ${user.lastName}`;
    }
  };

  const handleSubtaskInProgressChange = (subtask) => (event) => {
    dispatch(
      updateProgress({
        taskId: currentTask._id,
        subtask: { ...subtask, inProgress: event.target.checked },
      })
    );
  };

  const handleSubtaskDoneChange = (subtask) => (event) => {
    dispatch(
      updateDone({
        taskId: currentTask._id,
        subtask: { ...subtask, done: event.target.checked },
      })
    );
  };

  const handleTaskDoneState = () => {
    dispatch(
      toggleTaskDone({
        taskId: currentTask._id,
      })
    );
  };

  const getTaskName = (id) => {
    const task = tasks.find((task) => task._id === id);
    if (task.name) return task.name;
  };

  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {currentTask && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  "& > *": { mr: 2 },
                  borderBottom: 1,
                  borderColor: "lightgray",
                  width: "100%",
                }}
              >
                <TaskIcon fontSize="large" />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  {currentTask.name}
                </Typography>
              </Box>
              <Grid container padding={2} sx={{ "& > *": { p: "5px" } }}>
                <Grid item xs={6} md={2}>
                  <Typography variant="h6">Deadline: </Typography>
                </Grid>
                <Grid item xs={6} md={10}>
                  <Typography variant="body1">
                    {getDate(currentTask)}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="h6">Weight: </Typography>
                </Grid>
                <Grid item xs={6} md={10}>
                  <Typography variant="body1" sx={{ color: "#708090" }}>
                    {currentTask.weight}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="h6">Teams: </Typography>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Box sx={{ display: "flex", "& > *": { mr: 2 } }}>
                    {currentTask.teams.length > 0 ? (
                      currentTask.teams.map((teamId) => (
                        <Chip
                          variant="outlined"
                          label={teams.find((team) => team._id === teamId).name}
                        />
                      ))
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{ color: "#708090", opacity: "50%" }}
                      >
                        No Teams Assigned
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="h6">State: </Typography>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Typography
                    variant="body1"
                    sx={{ color: getStateColor(getTaskState(currentTask)) }}
                  >
                    {getStateText(getTaskState(currentTask))}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="h6">Dependency List: </Typography>
                </Grid>
                <Grid item xs={12} md={12} paddingX={3}>
                  {currentTask?.dependsOn.length > 0 ? (
                    currentTask?.dependsOn.map((task) => {
                      return (
                        <Link
                          underline="none"
                          sx={{
                            color: "black",
                            ":hover": {
                              cursor: "pointer",
                              color: "lightseagreen",
                            },
                          }}
                          onClick={() => {
                            history.push(`/projects/${params.id}/task/${task}`);
                          }}
                        >
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <TaskIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">
                              {getTaskName(task)}
                            </Typography>
                          </Box>
                        </Link>
                      );
                    })
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ color: "#708090", opacity: "50%" }}
                    >
                      No Dependency Found
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="h6">Description: </Typography>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Typography variant="body1">
                    {currentTask.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2} sx={{ "& > *": { p: "5px" } }}>
                <Grid item container justifyContent="center" xs={2}>
                  <Typography variant="h6">P/D</Typography>
                </Grid>
                <Grid item container justifyContent="center" xs={6}>
                  <Typography variant="h6">Subtask Name</Typography>
                </Grid>
                <Grid item container justifyContent="center" xs={2}>
                  <Typography variant="h6">Weight</Typography>
                </Grid>
                <Grid item container justifyContent="center" xs={2}>
                  <Typography variant="h6">Worker</Typography>
                </Grid>
              </Grid>
              {contributors.length > 0 &&
                currentTask.subtasks.map((subtask) => {
                  return (
                    <Grid
                      container
                      padding={2}
                      sx={{
                        ":hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                    >
                      <Grid item container justifyContent="center" xs={2}>
                        <Checkbox
                          sx={{ "&.Mui-checked": { color: "dodgerblue" } }}
                          onChange={handleSubtaskInProgressChange(subtask)}
                          checked={subtask.inProgress}
                          disabled={isOwner}
                        />
                        <Checkbox
                          sx={{ "&.Mui-checked": { color: "green" } }}
                          onChange={handleSubtaskDoneChange(subtask)}
                          checked={subtask.done}
                          disabled={isOwner}
                        />
                      </Grid>
                      <Grid item container alignItems="center" xs={6}>
                        <Typography variant="body1">{subtask.name}</Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent="center"
                        xs={2}
                      >
                        <Typography variant="body1" sx={{ color: "#708090" }}>
                          {subtask.weight}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent="center"
                        xs={2}
                      >
                        {subtask.worker !== "0" && <Avatar />}

                        <Typography
                          variant="body1"
                          sx={{ display: { xs: "none", md: "block" }, ml: 1 }}
                        >
                          {getWorkerName(subtask.worker)}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "100%",
                  mt: 5,
                  p: 5,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  disabled={!isOwner}
                  size="large"
                  variant={currentTask.done ? "outlined" : "contained"}
                  onClick={handleTaskDoneState}
                >
                  {currentTask.done
                    ? "Unfinish the Task"
                    : "Mark Task as Finished"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Task;
