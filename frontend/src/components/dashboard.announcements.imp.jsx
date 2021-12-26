import React from "react";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AddIcon from "@mui/icons-material/Add";
import NewAnnouncement from "./dashboard.newAnnouncement";
import { Box } from "@mui/system";
import { Typography, Grid, Fab, Modal, TextField, Button } from "@mui/material";

function AnnouncementsImp() {
  const [modalOpen, setModalOpen] = React.useState(false);
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
          }}
        >
          <Grid container justifyContent="center" xs={12}>
            <Grid item xs={10} md={8}>
              <NewAnnouncement />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" xs={12}>
            <Grid item xs={10} md={8}>
              <NewAnnouncement />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" xs={12}>
            <Grid item xs={10} md={8}>
              <NewAnnouncement />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" xs={12}>
            <Grid item xs={10} md={8}>
              <NewAnnouncement />
            </Grid>
          </Grid>
        </Box>
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
                maxRows={5}
                placeholder="Post Something!"
                label="New Post"
                fullWidth
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
                <Button sx={{ width: 100 }} onClick={() => setModalOpen(false)}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button sx={{ width: 100 }} variant="contained">
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
