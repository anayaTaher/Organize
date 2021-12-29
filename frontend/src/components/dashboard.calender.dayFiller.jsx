import { Typography, LinearProgress, Tooltip } from "@mui/material";
import { Box, flexbox } from "@mui/system";

function CalenderDay({ radiusPosition, tasksInWeek }) {
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
    default:
      break;
  }
  let linearProgressFiller = [];
  for (let i = 0; i < tasksInWeek; i++) {
    linearProgressFiller.push(
      <LinearProgress
        sx={{
          height: 7,
          mb: 2,
          opacity: "0%",
        }}
        value={100}
        variant="determinate"
      />
    );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: 1,
          minHeight: "120px",
          borderRadius: boxBorderRadius,
          color: "black",
          backgroundColor: "#e3e3e3",
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
            sx={{ display: { xs: "none", lg: "block" }, opacity: 0 }}
          >
            xd
          </Typography>
          <Typography variant="h4" sx={{opacity: 0}}>xd</Typography>
        </Box>
        {linearProgressFiller}
      </Box>
    </>
  );
}

export default CalenderDay;
