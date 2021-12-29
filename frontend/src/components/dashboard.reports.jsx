import React from "react";
import Navbar from "./dashboard.navbar";
import { Box } from "@mui/system";
import Header from "./header";
import { Typography, Grid } from "@mui/material";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchTasks } from "../reducers/actions/tasks";
import { fetchTeams } from "../reducers/actions/teams";
import { fetchContributors } from "../reducers/actions/contributors";
import { Doughnut } from "react-chartjs-2";
import { Avatar } from "@mui/material";

function Reports() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  const dispatch = useDispatch();
  const params = useParams();
  const teams = useSelector((state) => state.teams);
  const tasks = useSelector((state) => state.tasks);
  const contributors = useSelector((state) => state.contributors);
  const [data, setData] = React.useState({});
  const [data2, setData2] = React.useState({});
  const [data3, setData3] = React.useState([]);

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
    return state;
  };

  React.useEffect(() => {
    if (teams?.length === 0) return;
    if (tasks?.length === 0) return;
    if (contributors?.length === 0) return;

    let data = {};
    let totalDoneWeight = {};

    tasks.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        if (subtask.done) {
          if (!totalDoneWeight[task._id])
            totalDoneWeight[task._id] = subtask.weight;
          else totalDoneWeight[task._id] += subtask.weight;
        }
      });
    });

    tasks.forEach((task) => {
      task.teams.forEach((team) => {
        if (!data[team]) data[team] = totalDoneWeight[task._id];
        else data[team] += totalDoneWeight[task._id];
      });
    });

    teams.forEach((team) => {
      if (!data[team._id]) data[team._id] = 0;
    });

    setData(data);

    let data2 = [];
    tasks.forEach((task) => {
      const state = getTaskState(task);
      if (state === "behind" || state === "onHoldBehind") {
        task.teams.forEach((team) => {
          if (!data2.includes(team)) data2.push(team);
        });
      }
    });

    setData2(data2);

    let data3 = {};
    tasks.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        if (!data3[subtask.worker]) {
          data3[subtask.worker] = subtask.weight;
        } else {
          data3[subtask.worker] += subtask.weight;
        }
      });
    });

    contributors.forEach((cont) => {
      if (!data3[cont._id]) data3[cont._id] = 0;
    });

    let newConts = [];
    contributors.forEach((cont) => {
      newConts.push({ ...cont, data3: data3[cont._id] });
    });

    setData3(
      newConts.sort((a, b) => {
        if (a.data3 < b.data3) return 1;
        else if (a.data3 == b.data3) return 0;
        else return -1;
      })
    );
  }, [teams, tasks, contributors]);

  const realData = {
    labels: teams.map((team) => {
      return team.name;
    }),
    datasets: [
      {
        label: "Weight per Team",
        data: teams.map((team) => {
          return data[team._id];
        }),
        borderColor: teams.map(() => {
          return "gray";
        }),
        backgroundColor: teams.map(() => {
          return "lightseagreen";
        }),
      },
    ],
  };

  const realData2 = {
    labels: ["Teams On Schedule", "Teams Behind"],
    datasets: [
      {
        label: "Teams Behind",
        data: [teams.length - data2.length, data2.length],
        borderColor: ["#4caf50", "#f44336"],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const keys = Object.keys(data);
  let max = 0;
  keys.forEach((key) => {
    max = Math.max(max, data[key]);
  });
  const options = {
    title: { display: true, text: "Total Done Weight Per Team" },
    scales: { yAxes: [{ ticks: { min: 0, max: max, stepSize: max / 10 } }] },
  };

  React.useEffect(() => {
    dispatch(fetchContributors({ projectId: params.id }));
    dispatch(fetchTeams({ projectId: params.id }));
    dispatch(fetchTasks({ projectId: params.id }));
  }, [dispatch]);

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
            <InsertChartOutlinedIcon fontSize="large" />
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Project Reports
            </Typography>
          </Box>
          <Box></Box>
          <Grid container justifyContent="center" padding={2}>
            <Grid item xs={12} md={6} padding={2}>
              <Bar data={realData} options={options} />
            </Grid>
            <Grid item xs={12} md={6} padding={2}>
              <Doughnut data={realData2} />
            </Grid>
          </Grid>
          <Grid container padding={2} marginTop={2}>
            <Grid item xs={10}>
              <Typography variant="h6">Contributor</Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              xs={2}
            >
              <Typography variant="h6">Total Weight Done</Typography>
            </Grid>
          </Grid>
          {data3.map((cont) => {
            return (
              <Grid
                container
                padding={1}
                marginTop={2}
                sx={{ ":hover": { backgroundColor: "#eee" } }}
              >
                <Grid item xs={10}>
                  <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                    <Avatar src={cont.image} sx={{ mr: 1 }} />
                    <Typography>
                      {cont.firstName} {cont.lastName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  xs={2}
                >
                  <Typography sx={{ color: "#708090" }} variant="body2">
                    {cont.data3}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default Reports;
