import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  IconButton,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import React from "react";
import { Box } from "@mui/system";
import TaskRow from "./dashboard.tasks.taskRow";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../reducers/actions/tasks";
import { fetchTeams } from "../reducers/actions/teams";
import { isProjectOwner } from "../reducers/actions/projects";

function TasksImp() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const teams = useSelector((state) => state.teams);
  const [sortBy, setSortBy] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const owner = useSelector((state) => state.owner);
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const DisplayedTasks = React.useMemo(() => {
    let sortedData = [...tasks].filter((item) => {
      let taskName = item.name.toLowerCase();
      let searchItem = searchValue.toLowerCase();
      return taskName.includes(searchItem);
    });
    sortedData.sort((a, b) => {
      return a[sortBy] > b[sortBy];
    });
    return sortedData;
  }, [tasks, sortBy, searchValue]);

  React.useEffect(() => {
    dispatch(fetchTasks({ projectId: params.id }));
    dispatch(fetchTeams({ projectId: params.id }));
    dispatch(isProjectOwner({ projectId: params.id }));
  }, [dispatch]);

  React.useEffect(() => {}, [tasks, teams]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
            Project Tasks
          </Typography>
          <FormControl sx={{ mr: 5 }}>
            <InputLabel htmlFor="search-tasks">Search Tasks</InputLabel>
            <OutlinedInput
              id="search-tasks"
              label="Search Tasks"
              value={searchValue}
              onChange={handleSearchValueChange}
              startAdornment={<SearchIcon color="inherit" sx={{ mr: 1 }} />}
            />
          </FormControl>
          <FormControl sx={{ width: 150, mr: 5 }}>
            <InputLabel id="sort-by">Sort By</InputLabel>
            <Select
              onChange={handleSortByChange}
              value={sortBy}
              label="Sort By"
              labelId="sort-by"
              startAdornment={<SortIcon sx={{ mr: 1 }} />}
            >
              <MenuItem value="taskName">Name</MenuItem>
              <MenuItem value="taskDeadline">Deadline</MenuItem>
              <MenuItem value="taskState">State</MenuItem>
              <MenuItem value="taskWeight">Weight</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid
          container
          padding={1}
          paddingTop={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Grid item container justifyContent="center" xs={0.5}>
            <Typography variant="h6">State</Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={4}>
            <Typography variant="h6">Task</Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={3}>
            <Typography variant="h6">Team</Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={1}>
            <Typography variant="h6">Weight</Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={1}>
            <Typography variant="h6">Progress</Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={1.5}>
            <Typography variant="h6">Deadline</Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid
          container
          padding={1}
          paddingTop={2}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <Grid item container justifyContent="center" xs={12}>
            <Typography variant="h6">Displaying Task Details</Typography>
          </Grid>
        </Grid>
        {/* {DisplayedTasks.map((item) => {
          return (
            <TaskRow
              taskName={item.taskName}
              taskDeadline={item.taskDeadline}
              taskProgress={item.taskProgress}
              taskWeight={item.taskWeight}
              taskState={item.taskState}
              taskTeam={item.taskTeam}
            />
          );
        })} */}
        {DisplayedTasks.map((task) => {
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
            if (state === "onHold") state = "onHoldBehind";
            else state = "behind";
          }
          let isAllDone = true;
          task.subtasks.forEach((subtask) => {
            if (!subtask.done) isAllDone = false;
          });
          if (isAllDone) state = "pending";
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
        })}
        {owner && (
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            xs={12}
            sx={{ mt: 10 }}
          >
            <Typography variant="h6" sx={{ color: "#708090" }}>
              Create a new task
            </Typography>
            <IconButton
              sx={{ border: 1, mt: 2, color: "#708090" }}
              onClick={() => history.push(`/projects/${params.id}/newTask`)}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default TasksImp;
