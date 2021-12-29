import { Grid } from "@mui/material";
import CalenderDay from "./dashboard.calender.day";
import CalenderDayFiller from "./dashboard.calender.dayFiller";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchTasks } from "../reducers/actions/tasks";
import { useParams } from "react-router-dom";

const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthDays = [
  "31",
  "28",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31",
];

function Calender({ today }) {
  console.log(today);
  const [calender, setCalender] = React.useState([]);
  const realToday = new Date();
  const todayAlt = new Date(
    realToday.getFullYear(),
    realToday.getMonth(),
    realToday.getDate()
  );
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchTasks({ projectId: params.id }));
  }, [dispatch]);

  const firstDayInTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);

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
    let fillCalender = [];
    let dayCount = 0;
    let dayCountForTaskCounter = 0;
    let previousSize = -1;
    let numberOfTasksInWeek = 0;
    let counted = {};
    for (let i = 0; i < 42; i++) {
      let radiusPosition = -1;
      switch (i) {
        case 0:
          radiusPosition = 1;
          break;
        case 6:
          radiusPosition = 2;
          break;
        case 41:
          radiusPosition = 3;
          break;
        case 35:
          radiusPosition = 4;
          break;
        default:
          radiusPosition = -1;
      }
      if (i % 7 === 0) {
        numberOfTasksInWeek = 0;
        counted = {};
        for (let j = i; j < i + 7; j++) {
          if (i === 0 && j < firstDayInTheMonth.getDay()) continue;
          dayCountForTaskCounter++;
          const currentDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            dayCountForTaskCounter
          );
          tasks.forEach((task) => {
            const taskStartDate = new Date(Date.parse(task.startDate));
            const taskDeadline = new Date(Date.parse(task.deadline));
            if (
              taskStartDate.getTime() <= currentDate.getTime() &&
              taskDeadline.getTime() >= currentDate.getTime() &&
              !counted[task._id]
            ) {
              counted[task._id] = true;
              numberOfTasksInWeek++;
            }
          });
        }
      }
      if (i < firstDayInTheMonth.getDay()) {
        fillCalender.push(
          <Grid key={i} item xs={12 / 7}>
            <CalenderDayFiller
              radiusPosition={radiusPosition}
              tasksInWeek={numberOfTasksInWeek}
            />
          </Grid>
        );
        continue;
      }
      dayCount++;
      if (dayCount > monthDays[firstDayInTheMonth.getMonth()]) {
        if (i == 35) break;
        fillCalender.push(
          <Grid key={i} item xs={12 / 7}>
            <CalenderDayFiller
              radiusPosition={radiusPosition}
              tasksInWeek={numberOfTasksInWeek}
            />
          </Grid>
        );
        continue;
      }
      let loopDate = new Date(today.getFullYear(), today.getMonth(), dayCount);
      previousSize = fillCalender.length;
      let tasksBlock = [];
      tasks.forEach((task) => {
        let singleTask = {};
        singleTask.isFirstDay = false;
        singleTask.isLastDay = false;
        singleTask.taskName = "";
        singleTask.id = task.id;
        singleTask.isVisible = true;
        singleTask.taskState = getTaskState(task);
        const taskStartDate = new Date(Date.parse(task.startDate));
        const taskDeadline = new Date(Date.parse(task.deadline));
        let add = false;
        if (loopDate.getTime() === taskStartDate.getTime()) {
          singleTask.taskName = task.name;
          singleTask.isFirstDay = true;
          if (loopDate.getTime() === taskDeadline.getTime()) {
            singleTask.isLastDay = true;
          }
        } else if (loopDate > taskStartDate && loopDate < taskDeadline) {
          singleTask.taskName = task.name;
        } else if (loopDate.getTime() === taskDeadline.getTime()) {
          singleTask.taskName = task.name;
          singleTask.isLastDay = true;
        } else {
          singleTask.isVisible = false;
        }
        if (counted[task._id]) add = true;
        if (add) tasksBlock.push(singleTask);
      });
      fillCalender.push(
        <Grid key={i} item xs={12 / 7}>
          <CalenderDay
            radiusPosition={radiusPosition}
            tasksBlock={tasksBlock}
            monthName={monthName[loopDate.getMonth()]}
            monthDay={dayCount}
            isToday={loopDate.getTime() === todayAlt.getTime()}
          />
        </Grid>
      );
      if (previousSize === fillCalender.length) {
        fillCalender.push(
          <Grid item key={i} xs={12 / 7}>
            <CalenderDay
              radiusPosition={radiusPosition}
              monthName={monthName[loopDate.getMonth()]}
              monthDay={dayCount}
              isToday={loopDate.getTime() === todayAlt.getTime()}
            />
          </Grid>
        );
      }
    }
    setCalender(fillCalender);
  }, [tasks]);

  return (
    <>
      <Grid container sx={{ p: 5 }}>
        {calender}
      </Grid>
    </>
  );
}

export default Calender;
