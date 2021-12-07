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
  const firstDayInTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const tasks = [
    {
      id: 1,
      name: "Task 1",
      first: new Date(2021, 10, 1),
      last: new Date(2021, 10, 3),
    },
    {
      id: 2,
      name: "Task 2",
      first: new Date(2021, 10, 6),
      last: new Date(2021, 10, 11),
    },
    {
      id: 3,
      name: "Task 3",
      first: new Date(2021, 10, 2),
      last: new Date(2021, 10, 8),
    },
    {
      id: 5,
      name: "Task 5",
      first: new Date(2021, 10, 2),
      last: new Date(2021, 10, 8),
    },
    {
      id: 6,
      name: "Task 6",
      first: new Date(2021, 10, 2),
      last: new Date(2021, 10, 8),
    },
    {
      id: 4,
      name: "Task 4",
      first: new Date(2021, 10, 2),
      last: new Date(2021, 10, 8),
    },
  ];

  let fillCalender = [];
  let dayCount = 0;
  let previousSize = -1;
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
    if (i < firstDayInTheMonth.getDay()) {
      fillCalender.push(
        <Grid key={i} item xs={12 / 7}>
          <CalenderDayFiller radiusPosition={radiusPosition} />
        </Grid>
      );
      continue;
    }
    dayCount++;
    if (dayCount > monthDays[firstDayInTheMonth.getMonth()]) {
      fillCalender.push(
        <Grid key={i} item xs={12 / 7}>
          <CalenderDayFiller radiusPosition={radiusPosition} />
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
      tasksBlock.push(singleTask);
    });
    fillCalender.push(
      <Grid key={i} item xs={12 / 7}>
        <CalenderDay
          radiusPosition={radiusPosition}
          tasksBlock={tasksBlock}
          monthName={monthName[loopDate.getMonth()]}
          monthDay={dayCount}
          noTask={false}
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
            noTask={true}
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
