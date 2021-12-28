import React from "react";
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProjectIcon from "@mui/icons-material/Business";
import CreateProject from "./projects.createproject";
import ProjectCard from "./projects.projectcard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, fetchProjectsIn } from "../reducers/actions/projects";

function Projects() {
  const projects = useSelector((state) => state.projects);
  const projectsIn = useSelector((state) => state.projectsIn);
  const dispatch = useDispatch();
  const [aSearch, setASearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const handleAChange = (event) => {
    setASearch(event.target.value);
  };
  React.useEffect(() => {
    let newResult = [];
    projects.forEach((project) => {
      if (project.name.toLowerCase().includes(aSearch.toLowerCase())) {
        newResult.push(project);
      }
    });
    setSearchResult(newResult);
  }, [aSearch]);

  React.useEffect(() => {
    setSearchResult(projects);
  }, [projects]);

  React.useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchProjectsIn());
  }, [dispatch]);

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
          value={aSearch}
          onChange={handleAChange}
          sx={{ mr: 5 }}
        />
      </Toolbar>
      <Grid container justifyContent="center" sx={{ p: 5 }} gap={2}>
        <Grid item xs={10 / 1} sm={10 / 2} md={10 / 3} lg={10 / 4} xl={10 / 5}>
          <CreateProject />
        </Grid>
        {searchResult.map((project) => {
          return (
            <Grid
              key={project._id}
              item
              xs={10 / 1}
              sm={10 / 2}
              md={10 / 3}
              lg={10 / 4}
              xl={10 / 5}
            >
              <ProjectCard
                name={project.name}
                img={project.image}
                projectID={project._id}
              />
            </Grid>
          );
        })}
      </Grid>
      <Divider />
      <Toolbar sx={{ mt: 5 }}>
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
        />
      </Toolbar>
      <Grid container justifyContent="center" sx={{ p: 5 }} gap={2}>
        {projectsIn.map((project) => {
          return (
            <Grid
              item
              xs={10 / 1}
              sm={10 / 2}
              md={10 / 3}
              lg={10 / 4}
              xl={10 / 5}
            >
              <ProjectCard
                name={project.name}
                img={project.image}
                projectID={project._id}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Projects;
