import { Grid } from "@mui/material";
import CalenderDay from "./dashboard.calender.day";
import CalenderDayFiller from "./dashboard.calender.dayFiller";

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

function Calender() {
  const today = new Date();
  const todayAlt = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const firstDayInTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const tasks = [
    {
      id: 1,
      name: "Task 1",
      first: new Date(2021, 11, 17),
      last: new Date(2021, 11, 24),
      taskState: "onHold",
    },
    {
      id: 2,
      name: "Task 2",
      first: new Date(2021, 11, 14),
      last: new Date(2021, 11, 16),
      taskState: "behind",
    },
    {
      id: 3,
      name: "Task 3",
      first: new Date(2021, 11, 20),
      last: new Date(2021, 11, 25),
      taskState: "inProgress",
    },
    {
      id: 5,
      name: "Task 5",
      first: new Date(2021, 11, 23),
      last: new Date(2021, 11, 26),
      taskState: "notStarted",
    },
    {
      id: 6,
      name: "Task 6",
      first: new Date(2021, 11, 2),
      last: new Date(2021, 11, 31),
      taskState: "inProgress",
    },
    {
      id: 4,
      name: "Task 4",
      first: new Date(2021, 11, 18),
      last: new Date(2021, 11, 20),
      taskState: "done",
    },
  ];

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
          if (
            task.first.getTime() <= currentDate.getTime() &&
            task.last.getTime() >= currentDate.getTime() &&
            !counted[task.id]
          ) {
            counted[task.id] = true;
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
      if (i >= 35) break;
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
      singleTask.taskState = task.taskState;
      let add = false;
      if (loopDate.getTime() === task.first.getTime()) {
        singleTask.taskName = task.name;
        singleTask.isFirstDay = true;
      } else if (loopDate > task.first && loopDate < task.last) {
        singleTask.taskName = task.name;
      } else if (loopDate.getTime() === task.last.getTime()) {
        singleTask.taskName = task.name;
        singleTask.isLastDay = true;
      } else {
        singleTask.isVisible = false;
      }
      if (counted[task.id]) add = true;
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

  return (
    <>
      <Grid container sx={{ p: 5 }}>
        {fillCalender}
      </Grid>
    </>
  );
}

export default Calender;
