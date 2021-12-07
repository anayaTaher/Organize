import { Typography, LinearProgress, Tooltip } from "@mui/material";
import { Box, flexbox } from "@mui/system";

function CalenderDay({radiusPosition}) {
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
          color: 'black',
          backgroundColor: '#e3e3e3',
        }}
      >
      </Box>
    </>
  );
}

export default CalenderDay;
