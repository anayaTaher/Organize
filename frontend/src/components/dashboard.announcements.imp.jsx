import React from "react";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AddIcon from "@mui/icons-material/Add";
import NewAnnouncement from "./dashboard.newAnnouncement";
import { Box } from "@mui/system";
import { Typography, Grid, Fab, Modal, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isProjectOwner } from "../reducers/actions/projects";
import { getProjectOwner } from "../reducers/actions/projects";
import { getAccountData } from "../reducers/actions/action";
import {
  createAnnouncement,
  fetchAnnouncements,
} from "../reducers/actions/announcements";

function AnnouncementsImp() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const owner = useSelector((state) => state.owner);
  const announcements = useSelector((state) => state.announcements);
  const projectOwner = useSelector((state) => state.projectOwner);
  const user = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(isProjectOwner({ projectId: params.id }));
    dispatch(getProjectOwner({ projectId: params.id }));
    dispatch(fetchAnnouncements({ projectId: params.id }));
    dispatch(getAccountData());
  }, [dispatch]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setContent("");
  };

  const handlePostAnnouncement = () => {
    dispatch(createAnnouncement({ projectId: params.id, content }));
    handleModalClose();
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
        component="form"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            "& > *": {
              mr: 2,
            },
            borderBottom: 1,
            borderColor: "lightgray",
            width: "100%",
          }}
        >
          <AnnouncementIcon fontSize="large" />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Announcements
          </Typography>
        </Box>
        <Box
          sx={{
            "& > *:not(:first-child)": {
              mt: 5,
            },
            py: 5,
            width: "100%",
          }}
        >
          {announcements.length === 0 ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#708090", fontWeight: 500, opacity: 0.5 }}
              >
                No Announcements Were Posted
              </Typography>
            </Box>
          ) : (
            announcements.map((announcement) => {
              if (!user._id) return <></>;
              const date = new Date(Date.parse(announcement.date));
              return (
                <Grid container justifyContent="center" xs={12}>
                  <Grid item xs={10} md={8}>
                    <NewAnnouncement
                      key={announcement._id}
                      id={announcement._id}
                      owner={projectOwner}
                      content={announcement.content}
                      date={date}
                      likes={announcement.likes}
                      dislikes={announcement.dislikes}
                      currentUser={user._id}
                    />
                  </Grid>
                </Grid>
              );
            })
          )}
        </Box>
        {owner && (
          <Fab
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              height: 70,
              width: 70,
            }}
            color="primary"
            size="large"
            onClick={() => setModalOpen(true)}
          >
            <AddIcon sx={{ height: 35, width: 35 }} />
          </Fab>
        )}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Grid
            container
            xs={8}
            sx={{
              transform: "translate(-50%, -50%)",
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "white",
            }}
            padding={2}
            rowGap={2}
          >
            <Grid item xs={12}>
              <Typography>Post an announcement to your team!</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={5}
                placeholder="Post Something!"
                label="New Post"
                fullWidth
                value={content}
                onChange={handleContentChange}
              ></TextField>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              columnSpacing={5}
              sx={12}
            >
              <Grid item>
                <Button sx={{ width: 100 }} onClick={handleModalClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ width: 100 }}
                  variant="contained"
                  onClick={handlePostAnnouncement}
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </Box>
    </>
  );
}

export default AnnouncementsImp;
