import React from "react";
import {
  Avatar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Grid,
  IconButton
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Logo from "../assets/logo/logo.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Calender from "./dashboard.calender";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function ScheduleImp() {
  const [value, setValue] = React.useState(new Date());
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ p: 2, borderBottom: 1, borderColor: "lightgray" }}>
          <Toolbar sx={{ flexGrow: 1 }}>
            <Avatar src={Logo} sx={{ width: 60, height: 60, mr: 2 }} />
            <Typography
              variant="h5"
              sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
            >
              Organize Schedule
            </Typography>
          </Toolbar>
          <Toolbar>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Select Date"
                value={value}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Toolbar>
        </Toolbar>
        <Grid
          container
          xs={12}
          spacing={1}
          sx={{ p: 0, m: 0, display: { xs: "none", lg: "flex" } }}
        >
          <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconButton>
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Grid>
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ].map((item) => (
            <ThemeProvider theme={theme}>
              <Grid item xs={10 / 7} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6">{item}</Typography>
              </Grid>
            </ThemeProvider>
          ))}
          <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconButton>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          spacing={1}
          justifyContent="space-evenly"
          sx={{ p: 1, m: 0, display: { xs: "flex", lg: "none" } }}
        >
          <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconButton size="small">
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Grid>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => (
            <ThemeProvider theme={theme}>
              <Grid item xs={10 / 7} align="center" justify="center">
                <Typography variant="h6">{item}</Typography>
              </Grid>
            </ThemeProvider>
          ))}
          <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconButton size="small">
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Calender/>
      </Box>
    </>
  );
}

export default ScheduleImp;
