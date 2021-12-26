import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import React from "react";
import { green, red, teal } from "@mui/material/colors";
import { Box } from "@mui/system";

function NewAnnouncement() {
  const [upState, setUpState] = React.useState(false);
  const [downState, setDownState] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [likesColor, setLikesColor] = React.useState("#708090");
  const date = new Date();
  const dateStr = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} - ${
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  }:${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`;

  const handleUpState = () => {
    if (upState) {
      setUpState(false);
      setLikes(likes - 1);
      return;
    }
    setUpState(true);
    if (downState) {
      setLikes(likes + 2);
      setDownState(false);
      return;
    }
    setLikes(likes + 1);
  };

  const handleDownState = () => {
    if (downState) {
      setDownState(false);
      setLikes(likes + 1);
      return;
    }
    setDownState(true);
    if (upState) {
      setLikes(likes - 2);
      setUpState(false);
      return;
    }
    setLikes(likes - 1);
  };

  React.useEffect(() => {
    if (likes < 0) {
      setLikesColor(red[500]);
      return;
    }
    if (likes > 0) {
      setLikesColor(green[500]);
      return;
    }
    setLikesColor("#708090");
  }, [likes]);

  return (
    <>
      <Paper>
        <Grid container padding={1} paddingX={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                "& > *:not(:first-child)": { ml: 2 },
              }}
            >
              <Avatar
                src={
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                sx={{ height: 50, width: 50 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Link
                  href="#"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    ":hover": {
                      color: teal[400],
                      textDecoration: "none",
                    },
                  }}
                >
                  <Typography variant="body1" fontWeight={500}>
                    user
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: "#708090" }}>
                  {dateStr}
                </Typography>
              </Box>
              <Chip variant="outlined" label="Project Manager" />
            </Box>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Grid item xs>
              <Typography variant="body1">
                This announcement is towarded to the development team.
                <br /> We will be having a meeting on Sunday, 5th of December at
                10:00 AM throughout the website.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} padding={2} paddingBottom={1}>
            <Divider orientation="horizontal" />
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            sx={{
              "& > *": {
                ml: 1,
              },
            }}
          >
            <Typography variant="body1" sx={{ color: likesColor, flexGrow: 1 }}>
              {likes}
            </Typography>
            <IconButton
              sx={{ color: upState ? green[400] : "gray" }}
              onClick={handleUpState}
            >
              <ThumbUpOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ color: downState ? red[400] : "gray" }}
              onClick={handleDownState}
            >
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default NewAnnouncement;
