import { Typography, LinearProgress, Tooltip } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

function CalenderDay({
  monthName,
  monthDay,
  radiusPosition,
  tasksBlock,
  noTask,
  isToday,
}) {
  let boxBorderRadius = "0 0 0 0";
  switch (radiusPosition) {
    case 1:
      boxBorderRadius = "10px 0 0 0";
      break;
    case 2:
      boxBorderRadius = "0 10px 0 0";
      break;
    case 3:
      boxBorderRadius = "0 0 10px 0";
      break;
    case 4:
      boxBorderRadius = "0 0 0 10px";
      break;
  }

  let progressBorderRadius = [];
  tasksBlock.forEach((taskBlock) => {
    let taskProgressBorderRadius = "0 0 0 0";
    if (taskBlock.isFirstDay) {
      taskProgressBorderRadius = "4px 0 0 4px";
    }
    if (taskBlock.isLastDay) {
      taskProgressBorderRadius = "0 4px 4px 0";
    }
    if (taskBlock.isFirstDay && taskBlock.isLastDay) {
      taskProgressBorderRadius = "4px 4px 4px 4px";
    }
    progressBorderRadius.push(taskProgressBorderRadius);
  });

  const getColor = (taskState) => {
    let color = "#4caf50";
    switch (taskState) {
      case "inProgress":
        color = "#2196f3";
        break;
      case "behind":
        color = "#f44336";
        break;
      case "onHold":
        color = "#ff9800";
        break;
      case "notStarted":
        color = "#607d8b"
        break;
      case "onHoldBehind": 
        color = "#f44336";
        break;
      case "pending":
        color = "#673ab7";
        break;
      default:
        break;
    }
    return color;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: 1,
          borderColor: "black",
          minHeight: "120px",
          borderRadius: boxBorderRadius,
          boxShadow: isToday ? "0px 0px 0px 3px lightseagreen inset" : "",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            p: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            {monthName}
          </Typography>
          <Typography variant="h4">{monthDay}</Typography>
        </Box>
        {tasksBlock.map((task, i) => {
          return (
            <Tooltip key={i} title={task.taskName}>
              <LinearProgress
                sx={{
                  height: 7,
                  ml: task.isFirstDay ? { xs: 2, md: 4 } : 0,
                  mr: task.isLastDay ? { xs: 2, md: 4 } : 0,
                  mb: 2,
                  borderRadius: progressBorderRadius[i],
                  opacity: task.isVisible ? "100%" : "0%",
                  [`&.${linearProgressClasses.colorPrimary}`]: {
                    backgroundColor: getColor(task.taskState),
                  },
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: getColor(task.taskState),
                  },
                }}
                value={100}
                variant="determinate"
              />
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
}

export default CalenderDay;
