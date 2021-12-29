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
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  likeAnnouncement,
  dislikeAnnouncement,
  unLikeAnnouncement,
  unDislikeAnnouncement,
  deleteAnnouncement,
} from "../reducers/actions/announcements";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

function NewAnnouncement(props) {
  const [upState, setUpState] = React.useState(
    props.likes.includes(props.currentUser)
  );
  const [downState, setDownState] = React.useState(
    props.dislikes.includes(props.currentUser)
  );
  const [likes, setLikes] = React.useState(
    props.likes.length - props.dislikes.length
  );
  const [likesColor, setLikesColor] = React.useState("#708090");
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.owner);

  const handleUpState = () => {
    if (upState) {
      setUpState(false);
      setLikes(likes - 1);
      dispatch(
        unLikeAnnouncement({
          announcementId: props.id,
          userId: props.currentUser,
        })
      );
      return;
    }
    setUpState(true);
    if (downState) {
      setLikes(likes + 2);
      setDownState(false);
      dispatch(
        unDislikeAnnouncement({
          announcementId: props.id,
          userId: props.currentUser,
        })
      );
      dispatch(
        likeAnnouncement({
          announcementId: props.id,
          userId: props.currentUser,
        })
      );
      return;
    }
    setLikes(likes + 1);
    dispatch(
      likeAnnouncement({ announcementId: props.id, userId: props.currentUser })
    );
  };

  const handleDownState = () => {
    if (downState) {
      setDownState(false);
      setLikes(likes + 1);
      dispatch(
        unDislikeAnnouncement({
          announcementId: props.id,
          userId: props.currentUser,
        })
      );
      return;
    }
    setDownState(true);
    if (upState) {
      setLikes(likes - 2);
      setUpState(false);
      dispatch(
        unLikeAnnouncement({
          announcementId: props.id,
          userId: props.currentUser,
        })
      );
      dispatch(
        dislikeAnnouncement({
          announcementId: props.id,
          userId: props.currentUser,
        })
      );
      return;
    }
    setLikes(likes - 1);
    dispatch(
      dislikeAnnouncement({
        announcementId: props.id,
        userId: props.currentUser,
      })
    );
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

  const handleAnnouncementDelete = () => {
    dispatch(deleteAnnouncement({announcementId: props.id}));
  }

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
              <Avatar src={props.owner.image} sx={{ height: 50, width: 50 }} />
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
                    {`${props.owner.firstName} ${props.owner.lastName}`}
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: "#708090" }}>
                  {moment(props.date).fromNow()}
                </Typography>
              </Box>
              {owner && (
                <IconButton onClick={handleAnnouncementDelete}>
                  <DeleteIcon sx={{ color: red[500] }} />
                </IconButton>
              )}
              <Chip variant="outlined" label="Project Manager" />
            </Box>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Grid item xs>
              <Typography variant="body1">{props.content}</Typography>
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
