import React from "react";
import {
  Box,
  Typography,
  CardActionArea,
  CardContent,
  Card,
  Avatar,
} from "@mui/material";

function ProjectCard({ name, img, projectID }) {
  return (
    <>
      <Box
        sx={{
          color: "lightseagreen",
          border: 1,
          width: "100%",
          height: 400,
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
          href={window.location.href + "/" + projectID}
        >
          <CardContent>
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar src={img} sx={{ height: 150, width: 150, mb: 5 }} />
              <Typography variant="h6" textAlign="center">
                {name}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
    </>
  );
}

export default ProjectCard;
