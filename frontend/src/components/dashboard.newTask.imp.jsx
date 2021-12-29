import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Checkbox,
  Button,
} from "@mui/material";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../reducers/actions/tasks";
import { useParams, useHistory } from "react-router-dom";
import { fetchTeams } from "../reducers/actions/teams";
import { fetchTasks } from "../reducers/actions/tasks";

function Subtitle({ number, title, mt = 0 }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, pt: 4, mt }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          width: "50px",
          backgroundColor: "lightgray",
          color: "white",
          borderRadius: "50%",
          mr: 2,
        }}
      >
        <Typography variant="h4">{number}</Typography>
      </Box>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
}

function NewTaskImp() {
  const dispatch = useDispatch();
  const params = useParams();
  const teams = useSelector((state) => state.teams);
  const tasks = useSelector((state) => state.tasks);
  const history = useHistory();
  const today = new Date();

  const [taskData, setTaskData] = React.useState({
    taskName: "",
    taskDescription: "",
    taskWeight: 0,
    taskDeadline: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ),
    taskStartDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ),
  });

  const [subtaskData, setSubtaskData] = React.useState({
    id: 0, //local id for now
    subtaskName: "",
    subtaskWeight: 0,
  });

  const [subtasks, setSubtasks] = React.useState([]);

  React.useEffect(() => {
    dispatch(fetchTeams({ projectId: params.id }));
    dispatch(fetchTasks({ projectId: params.id }));
  }, [dispatch]);

  const [checkedTeams, setCheckedTeams] = React.useState([]);

  React.useEffect(() => {
    setCheckedTeams(teams.map((team) => ({ ...team, isChecked: false })));
  }, [teams]);

  const [checkedTasks, setCheckedTasks] = React.useState([]);

  React.useEffect(() => {
    setCheckedTasks(tasks.map((task) => ({ ...task, isChecked: false })));
  }, [tasks]);

  const submitTask = () => {
    const newSubtasks = subtasks.map((subtask) => {
      return {
        name: subtask.subtaskName,
        weight: subtask.subtaskWeight,
        inProgress: false,
        done: false,
        worker: "0",
        finisher: "0",
      };
    });
    const newTask = {
      projectId: params.id,
      name: taskData.taskName,
      description: taskData.taskDescription,
      weight: taskData.taskWeight,
      startDate: taskData.taskStartDate,
      deadline: taskData.taskDeadline,
      subtasks: newSubtasks,
      teams: checkedTeams.filter((team) => {
        if (team.isChecked) return team._id;
      }),
      dependsOn: checkedTasks.filter((task) => {
        if (task.isChecked) return task._id;
      }),
      done: false,
    };
    dispatch(createTask(newTask));
    history.push(`/projects/${params.id}/tasks`);
  };

  const handleSubtaskDataChange = (field) => (event) => {
    if (field === "subtaskWeight") {
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue.subtaskWeight;
      const weightSummation = subtasks.reduce(reducer, 0);
      let value = Number(event.target.value);
      if (value + weightSummation > taskData.taskWeight) {
        value = taskData.taskWeight - weightSummation;
      }
      setSubtaskData({
        ...subtaskData,
        [field]: value,
      });
      return;
    }
    setSubtaskData({ ...subtaskData, [field]: event.target.value });
  };

  const handleNewTaskDataChange = (field) => (event) => {
    if (field === "taskDeadline" || field === "taskStartDate") {
      const realDate = new Date(
        event.getFullYear(),
        event.getMonth(),
        event.getDate()
      );
      setTaskData({ ...taskData, [field]: realDate }); //event is the new date value
      return;
    }
    if (field === "taskWeight") {
      setTaskData({ ...taskData, [field]: Number(event.target.value) });
      return;
    }
    setTaskData({ ...taskData, [field]: event.target.value });
  };

  const clearSubtaskFields = () => {
    setSubtaskData({
      ...subtaskData,
      subtaskName: "",
      subtaskWeight: 0,
    });
  };

  const addSubtask = () => {
    if (subtaskData.subtaskName !== "") {
      const newSubTask = {
        id: subtaskData.id,
        subtaskName: subtaskData.subtaskName,
        subtaskWeight: subtaskData.subtaskWeight,
      };
      setSubtaskData({
        subtaskName: "",
        subtaskWeight: 0,
        id: subtaskData.id + 1,
      }); // local id for now
      setSubtasks([...subtasks, newSubTask]);
    }
  };

  const removeSubtask = (id) => () => {
    setSubtasks(
      subtasks.filter((subtask) => {
        return subtask.id !== id;
      })
    );
  };

  const handleTeamCheckChange = (id) => () => {
    setCheckedTeams(
      checkedTeams.map((team) =>
        team._id === id ? { ...team, isChecked: !team.isChecked } : team
      )
    );
  };

  const handleTaskCheckChange = (id) => () => {
    setCheckedTasks(
      checkedTasks.map((task) =>
        task._id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  return (
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
        <AddBoxIcon fontSize="large" />
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          New Task
        </Typography>
      </Box>
      <Subtitle number={1} title={"Task Details"} />
      <Grid container padding={2} rowGap={2} sx={{ "& > *": { px: 1 } }}>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Task Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Task Name"
            fullWidth
            value={taskData.taskName}
            onChange={handleNewTaskDataChange("taskName")}
            required
          />
        </Grid>
        <Grid item container xs={4} alignItems="center" justifyContent="center">
          <Typography variant="body1">Task Start Date</Typography>
        </Grid>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Task Description</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Task Description"
            value={taskData.taskDescription}
            onChange={handleNewTaskDataChange("taskDescription")}
            multiline
            fullWidth
            rows={15}
          />
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
              date={taskData.taskStartDate}
              onChange={handleNewTaskDataChange("taskStartDate")}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Task Weight</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Task Weight"
            value={taskData.taskWeight}
            onChange={handleNewTaskDataChange("taskWeight")}
            type="number"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item container xs={4} alignItems="center" justifyContent="center">
          <Typography variant="body1">Task Deadline</Typography>
        </Grid>
        <Grid xs={2} />
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Info:</Typography>
          <Typography>Task Name: Minimal info about the task.</Typography>
          <Typography>
            Task Description: Everything that has to be explained about the
            task.
          </Typography>
          <Typography>
            Task Weight: Estimiation about the difficulty of the task.
          </Typography>
          <Typography>
            Task Start Date: The start date to being working on the task.
          </Typography>
          <Typography>
            Task Deadline: The last date to handle the task.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
              date={taskData.taskDeadline}
              onChange={handleNewTaskDataChange("taskDeadline")}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Subtitle number={2} title={"Sub Tasks"} mt={4} />
      <Grid container padding={2} rowGap={2} sx={{ "& > *": { px: 1 } }}>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Subtask Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Subtask Name"
            fullWidth
            value={subtaskData.subtaskName}
            onChange={handleSubtaskDataChange("subtaskName")}
            required
          />
        </Grid>
        <Grid item container alignItems="center" xs={4}>
          <Box>
            <Tooltip title="Add Subtask">
              <IconButton onClick={addSubtask}>
                <AddIcon sx={{ color: green[500] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear Subtask Fields">
              <IconButton onClick={clearSubtaskFields}>
                <ClearIcon sx={{ color: red[500] }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Subtask Weight</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Subtask Weight"
            fullWidth
            value={subtaskData.subtaskWeight}
            onChange={handleSubtaskDataChange("subtaskWeight")}
            required
            type="number"
            helperText="The summation of all subtask weights must be equal to the overall task weight."
          />
        </Grid>
        <Grid item xs={4} />
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Added Subtasks</Typography>
        </Grid>
        <Grid item container xs={6}>
          <Grid
            container
            sx={{ border: 1, borderColor: "lightgray", borderRadius: 1, p: 2 }}
          >
            <Grid item container xs={12}>
              <Grid item container justifyContent="center" xs={6}>
                <Typography variant="body1" fontWeight={700}>
                  Subtask Name
                </Typography>
              </Grid>
              <Grid item container justifyContent="center" xs={4}>
                <Typography variant="body1" fontWeight={700}>
                  Subtask Weight
                </Typography>
              </Grid>
              <Grid item container justifyContent="center" xs={2}>
                <Typography variant="body1" fontWeight={700}>
                  Subtask Options
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" paddingTop={2}>
              {subtasks.map((subtask) => {
                return (
                  <>
                    <Grid item xs={6} textOverflow={"clip"}>
                      <Typography
                        variant="body1"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        {subtask.subtaskName}
                      </Typography>
                    </Grid>
                    <Grid item container justifyContent="center" xs={4}>
                      <Typography variant="body1" sx={{ color: "#708090" }}>
                        {subtask.subtaskWeight}
                      </Typography>
                    </Grid>
                    <Grid item container justifyContent="center" xs={2}>
                      <IconButton onClick={removeSubtask(subtask.id)}>
                        <DeleteIcon sx={{ color: red[500] }} />
                      </IconButton>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Subtitle number={3} title={"Assign Teams"} mt={4} />
      <Grid container padding={2} rowGap={2} sx={{ "& > *": { px: 1 } }}>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Available Teams</Typography>
        </Grid>
        <Grid item container xs={6}>
          <Grid
            container
            sx={{ border: 1, borderColor: "lightgray", borderRadius: 1, p: 2 }}
          >
            <Grid item container xs={12}>
              <Grid item container justifyContent="center" xs={10}>
                <Typography variant="body1" fontWeight={700}>
                  Team Name
                </Typography>
              </Grid>
              <Grid item container justifyContent="center" xs={2}>
                <Typography variant="body1" fontWeight={700}>
                  Add Team
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" paddingTop={2}>
              {checkedTeams.map((team) => {
                return (
                  <>
                    <Grid item xs={10}>
                      <Typography variant="body1">{team.name}</Typography>
                    </Grid>
                    <Grid item container justifyContent="center" xs={2}>
                      <Checkbox
                        checked={team.isChecked}
                        onChange={handleTeamCheckChange(team._id)}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Subtitle number={4} title={"Task Dependency"} mt={4} />
      <Grid container padding={2} rowGap={2} sx={{ "& > *": { px: 1 } }}>
        <Grid
          item
          container
          flexDirection="row-reverse"
          alignItems="center"
          xs={2}
        >
          <Typography variant="body1">Available Task</Typography>
        </Grid>
        <Grid item container xs={6}>
          <Grid
            container
            sx={{ border: 1, borderColor: "lightgray", borderRadius: 1, p: 2 }}
          >
            <Grid item container xs={12}>
              <Grid item container justifyContent="center" xs={10}>
                <Typography variant="body1" fontWeight={700}>
                  Task Name
                </Typography>
              </Grid>
              <Grid item container justifyContent="center" xs={2}>
                <Typography variant="body1" fontWeight={700}>
                  Depends On
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" paddingTop={2}>
              {checkedTasks.map((task) => {
                return (
                  <>
                    <Grid item xs={10}>
                      <Typography variant="body1">{task.name}</Typography>
                    </Grid>
                    <Grid item container justifyContent="center" xs={2}>
                      <Checkbox
                        checked={task.isChecked}
                        onChange={handleTaskCheckChange(task._id)}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Grid container padding={2}>
          <Grid item container flexDirection="row-reverse" xs={8}>
            <Button size="large" variant="contained" onClick={submitTask}>
              Create Task
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default NewTaskImp;
