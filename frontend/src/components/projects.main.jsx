import {
  Typography,
  Box,
  Toolbar,
  TextField,
  InputAdornment,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProjectIcon from "@mui/icons-material/Business";
import CreateProject from "./projects.createproject";
import ProjectCard from "./projects.projectcard";

function Projects() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          bgcolor: "lightseagreen",
          p: 2,
          pl: 5,
          mb: 2,
        }}
      >
        <ProjectIcon sx={{ color: "white", mr: 2, height: 40, width: 40 }} />
        <Typography variant="h3" sx={{ color: "white" }}>
          Projects
        </Typography>
      </Box>
      <Toolbar>
        <Typography
          variant="h4"
          sx={{ ml: 5, flexGrow: 1, color: "#708090", mr: 2 }}
        >
          Administrated Projects
        </Typography>
        <TextField
          label="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 5 }}
        ></TextField>
      </Toolbar>
      <Grid
        container
        justifyContent="center"
        sx={{ p: 5}}
        gap={2}
      >
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <CreateProject />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
      </Grid>
      <Divider/>
      <Toolbar sx={{mt: 5}}>
        <Typography
          variant="h4"
          sx={{ ml: 5, flexGrow: 1, color: "#708090", mr: 2 }}
        >
          Projects In
        </Typography>
        <TextField
          label="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 5 }}
        ></TextField>
      </Toolbar>
      <Grid
        container
        justifyContent="center"
        sx={{ p: 5}}
        gap={2}
      >
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
        <Grid item xs={10/1} sm={10/2} md={10/3} lg={10/4} xl={10/5}>
          <ProjectCard />
        </Grid>
      </Grid>
    </>
  );
}

export default Projects;
