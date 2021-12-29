import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TeamIcon from "@mui/icons-material/Person";
import ProjectContributor from "./dashboard.contributor.projectContributor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../reducers/actions/teams";
import { isProjectOwner } from "../reducers/actions/projects";
import {
  addContributor,
  fetchContributors,
} from "../reducers/actions/contributors";
import PeopleIcon from "@mui/icons-material/PeopleAlt";
import { fetchTasks } from "../reducers/actions/tasks";

const modalBoxStyle = {
  height: 200,
  width: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  "& > *:not(:first-child)": {
    mt: 2,
  },
};

function BoxModal({ modalOpen, handleModalClose }) {
  const [userEmail, setUserEmail] = React.useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const addUser = () => {
    dispatch(addContributor({ projectId: params.id, userEmail }));
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="body1">Type the user email below</Typography>
          <TextField
            label="User Email"
            sx={{ width: "70%" }}
            value={userEmail}
            onChange={handleUserEmailChange}
          />
          <Button variant="contained" onClick={addUser}>
            Add User
          </Button>
        </Box>
      </Modal>
    </>
  );
}

function ContributorsImp() {
  const contributors = useSelector((state) => state.contributors);
  const dispatch = useDispatch();
  const params = useParams();
  const [team, setTeam] = React.useState("ALL");
  const [searchValue, setSearchValue] = React.useState("");
  const teams = useSelector((state) => state.teams);
  const owner = useSelector((state) => state.owner);
  const tasks = useSelector((state) => state.tasks);

  const contributorsDisplayed = React.useMemo(() => {
    console.log(team);
    let conts = contributors.filter((contributor) => {
      const name = contributor.firstName + contributor.lastName;
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        return contributor;
      }
    });
    if (team === "ALL") return conts;
    conts = conts.filter((contributor) => {
      if (contributor.teams && contributor.teams.includes(team))
        return contributor;
    });
    return conts;
  }, [contributors, searchValue, team]);

  const handleSelectTeamChange = (event) => {
    setTeam(event.target.value);
  };
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    dispatch(fetchContributors({ projectId: params.id }));
    dispatch(fetchTeams({ projectId: params.id }));
    dispatch(isProjectOwner({ projectId: params.id }));
    dispatch(fetchTasks({ projectId: params.id }));
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderBottom: 1,
          borderColor: "lightgray",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <PeopleIcon fontSize="medium" sx={{ ml: 2 }} />
          <Typography variant="h5" sx={{ ml: 1 }}>
            Project Contributors
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container alignItems="center" padding={1}>
          <Grid item xs={4}>
            <Typography
              variant="body1"
              sx={{ flexGrow: 1, ml: 5, display: { xs: "block", md: "none" } }}
            >
              {contributors?.length} Contributor
              {contributors?.length === 1 ? "" : "s"}
            </Typography>
          </Grid>
          <Grid item container flexDirection="row-reverse" xs={8}>
            <Button
              variant="contained"
              sx={{ mr: 5 }}
              onClick={handleModalOpen}
            >
              New Member
            </Button>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={0}
            sm={4}
            md={6}
            xl={8}
            padding={2}
            marginTop={2}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Typography
              variant="body1"
              sx={{ flexGrow: 1, ml: 5, display: { xs: "none", md: "block" } }}
            >
              {contributors?.length} Contributor
              {contributors?.length === 1 ? "" : "s"}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} xl={2} padding={2} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="team-select">Select Team</InputLabel>
              <Select
                onChange={handleSelectTeamChange}
                value={team}
                label="Select Team"
                labelId="team-select"
                startAdornment={<TeamIcon />}
                defaultValue="ALL"
                defaultChecked={1}
              >
                <MenuItem value="ALL">- Display All -</MenuItem>
                {teams.length > 0 &&
                  teams.map((t) => {
                    return <MenuItem value={t.name}>{t.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={3} xl={2} padding={2} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="search-teams">Search Members</InputLabel>
              <OutlinedInput
                id="search-teams"
                label="Search Members"
                value={searchValue}
                onChange={handleSearchValueChange}
                startAdornment={<SearchIcon color="inherit" />}
              />
            </FormControl>
          </Grid>
        </Grid>
        <BoxModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
        <Divider sx={{ m: 2 }} />
        <Grid container padding={2}>
          <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="h6">Team Member</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="h6">Assigned Teams</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
            <Typography variant="h6">Displaying Contributor Details</Typography>
          </Grid>
        </Grid>
        {contributorsDisplayed.map((contributor) => {
          const workingTasks = tasks.filter((task) => {
            const workingSubtasks = task.subtasks.filter(
              (subtask) => 
                subtask.worker == contributor._id &&
                subtask.finisher != contributor._id
            );
            if (workingSubtasks?.length > 0) return task;
          });
          return (
            <ProjectContributor
              key={contributor._id}
              id={contributor._id}
              firstName={contributor.firstName}
              lastName={contributor.lastName}
              teams={contributor.teams}
              owner={owner}
              tasks={workingTasks}
            />
          );
        })}
      </Box>
    </>
  );
}

export default ContributorsImp;
