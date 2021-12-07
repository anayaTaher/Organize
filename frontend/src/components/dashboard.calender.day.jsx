import { Typography, LinearProgress, Tooltip } from "@mui/material";
import { Box, flexbox } from "@mui/system";

function CalenderDay({
  monthName,
  monthDay,
  radiusPosition,
  tasksBlock,
  noTask,
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
      taskProgressBorderRadius = "10px 0 0 10px";
    }
    if (taskBlock.isLastDay) {
      taskProgressBorderRadius = "0 10px 10px 0";
    }
    if (taskBlock.isFirstDay && taskBlock.isLastDay) {
      taskProgressBorderRadius = "10px 10px 10px 10px";
    }
    progressBorderRadius.push(taskProgressBorderRadius);
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: 1,
          minHeight: "150px",
          borderRadius: boxBorderRadius,
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
        {tasksBlock.map((taskBlock, i) => {
          console.log(monthDay, monthName);
          return (
            <Tooltip key={i} title={taskBlock.taskName}>
              <LinearProgress
                sx={{
                  height: 10,
                  ml: taskBlock.isFirstDay ? { xs: 2, md: 4 } : 0,
                  mr: taskBlock.isLastDay ? { xs: 2, md: 4 } : 0,
                  mb: 2,
                  borderRadius: progressBorderRadius[i],
                  opacity: taskBlock.isVisible ? '100%' : '0%'
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
