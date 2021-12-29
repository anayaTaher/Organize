import React from "react";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  Checkbox,
} from "@mui/material";
import Navbar from "./dashboard.navbar";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributors } from "../reducers/actions/contributors";
import { useParams } from "react-router-dom";
import { editTeam } from "../reducers/actions/teams";
import Header from "./header";
import { fetchTeam } from "../reducers/actions/team";
import { useHistory } from "react-router-dom";

function EditTeamDetails({ checkList, team }) {
  const [teamName, setTeamName] = React.useState(team.name);
  const params = useParams();
  const [successMessage, setSuccessMessage] = React.useState("");
  const history = useHistory();

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  React.useEffect(() => {
    setTeamName(team.name);
  }, [team]);

  const editTeamWithMembers = async () => {
    const keys = Object.keys(checkList);
    let members = [];
    keys.forEach((key) => {
      if (checkList[key]) members.push(key);
    });
    const data = {
      teamId: params.tid,
      name: teamName,
      members,
    };
    const value = await editTeam(data);
    if (value == 200) {
      setSuccessMessage(`Team ${teamName} was edited successfully`);
    }
    history.push(`/projects/${params.id}/teams`);
  };
  return (
    <Grid container padding={5} columnGap={2}>
      <Grid
        item
        container
        alignItems="center"
        flexDirection="row-reverse"
        xs={2}
      >
        <Typography variant="body1">Team Name:</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Team Name"
          fullWidth
          value={teamName}
          onChange={handleTeamNameChange}
        />
      </Grid>
      <Grid item container xs={2}>
        <Button variant="contained" fullWidth onClick={editTeamWithMembers}>
          Edit
        </Button>
      </Grid>
      <Grid item xs={2} />
      <Grid item>
        <Typography variant="overline" sx={{ color: "green" }}>
          {successMessage}
        </Typography>
      </Grid>
    </Grid>
  );
}

function EditTeam() {
  const contributors = useSelector((state) => state.contributors);
  const dispatch = useDispatch();
  const params = useParams();
  const team = useSelector((state) => state.team);
  const [checkList, setCheckList] = React.useState({});
  React.useEffect(() => {
    dispatch(fetchContributors({ projectId: params.id }));
    dispatch(fetchTeam({ teamId: params.tid }));
  }, [dispatch]);

  React.useEffect(() => {
    let list = {};
    if (!team.members) return;
    contributors.forEach((cont) => {
      list[cont._id] = team.members.includes(cont._id);
    });
    setCheckList(list);
  }, [contributors, team]);

  const handleCheckChange = (id) => (event) => {
    setCheckList({ ...checkList, [id]: event.target.checked });
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header flag={false} navbarMobile={setMobileOpen} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
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
            <GroupAddIcon fontSize="large" />
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Edit Team
            </Typography>
          </Box>
          {Object.keys(team).length > 0 && (
            <EditTeamDetails checkList={checkList} team={team} />
          )}

          <Typography variant="h5" sx={{ ml: 3 }}>
            Available Users
          </Typography>
          <Grid container paddingX={5} paddingY={2}>
            <Grid item container alignItems="center" xs={10}>
              <Typography variant="h6">User</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Add</Typography>
            </Grid>
          </Grid>
          {contributors.map((contributor) => {
            return (
              <Grid
                key={contributor._id}
                container
                paddingX={5}
                marginY={1}
                key={contributor._id}
              >
                <Grid item container alignItems="center" xs={10}>
                  <Avatar sx={{ mr: 2 }} />
                  <Typography variant="body1">{`${contributor.firstName} ${contributor.lastName}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Checkbox
                    checked={checkList[contributor._id] ? true : false}
                    onChange={handleCheckChange(contributor._id)}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default EditTeam;
