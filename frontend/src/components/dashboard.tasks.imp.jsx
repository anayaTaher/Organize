import {
  Grid,
  Typography,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Button,
  IconButton,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import React from "react";
import { Box, typography } from "@mui/system";
import TaskRow from "./dashboard.tasks.taskRow";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";

const date1 = new Date(2021, 10, 20);
const date2 = new Date(2022, 5, 1);
const date3 = new Date(2020, 0, 14);
const taskTeam1 = [
  "Design Team",
  "Frontend Team",
  "Backend Team",
  "Management Team",
];
const taskTeam2 = ["Backend Team"];
const taskTeam3 = ["Management Team", "Frontend Team"];

const data = [
  {
    taskName: "Desiging the Frontend Using Material UI",
    taskState: "done",
    taskWeight: 120,
    taskTeam: taskTeam1,
    taskDeadline: date2,
    taskProgress: 100,
  },
  {
    taskName: "Testing and Deployment",
    taskState: "onHold",
    taskWeight: 150,
    taskTeam: taskTeam2,
    taskDeadline: date3,
    taskProgress: 100,
  },
  {
    taskName: "Finshing The Backend",
    taskState: "done",
    taskWeight: 180,
    taskTeam: taskTeam3,
    taskDeadline: date1,
    taskProgress: 50,
  },
];

function TasksImp() {
  const [sortBy, setSortBy] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const DisplayedTasks = React.useMemo(() => {
    let sortedData = [...data].filter((item) => {
      let taskName = item.taskName.toLowerCase();
      let searchItem = searchValue.toLowerCase();
      return taskName.includes(searchItem);
    });
    sortedData.sort((a, b) => {
      return a[sortBy] > b[sortBy];
    });
    return sortedData;
  }, [data, sortBy, searchValue]);
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
        <Grid container padding={1} paddingTop={2}>
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
        {DisplayedTasks.map((item) => {
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
        })}
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
          <IconButton sx={{ border: 1, mt: 2, color: "#708090" }}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Box>
    </>
  );
}

export default TasksImp;
