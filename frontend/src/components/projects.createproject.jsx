import React from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";

function CreateProject() {
  const [create, setCreate] = React.useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "lightseagreen",
          border: 1,
          width: '100%',
          height: 400,
        }}
      >
        {create ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mb: 2 }} variant="overline">
              Fill in the project information
            </Typography>
            <IconButton
              sx={{
                border: 1,
                color: "lightseagreen",
                height: 100,
                width: 100,
                mb: 3,
              }}
              onClick={() => setCreate(true)}
            >
              <ImageIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <TextField
              sx={{ width: "80%", mb: 5 }}
              size="small"
              label="Project Name"
            ></TextField>
            <Button
              sx={{
                color: "white",
                backgroundColor: "lightseagreen",
                "&:hover": {
                  backgroundColor: "#62c9c3",
                },
                width: "60%",
                mb: 1,
              }}
            >
              Create
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#708090",
                "&:hover": {
                  backgroundColor: "#9aa6b1",
                },
                width: "60%",
                mb: 1,
              }}
              onClick={() => setCreate(false)}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: create ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="overline">New Project</Typography>
            <IconButton
              disableRipple
              sx={{ border: 1, color: "lightseagreen" }}
              onClick={() => setCreate(true)}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CreateProject;
