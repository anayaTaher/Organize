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
import Header from "./dashboard.header";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributors } from "../reducers/actions/contributors";
import { useParams } from "react-router-dom";
import { addTeam } from "../reducers/actions/teams";

function NewTeamDetails({ checkList }) {
  const [teamName, setTeamName] = React.useState("");
  const params = useParams();
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const addTeamWithMembers = async () => {
    const keys = Object.keys(checkList);
    let members = [];
    keys.forEach((key) => {
      if (checkList[key]) members.push(key);
    });
    const data = {
      projectId: params.id,
      teamName,
      members,
    };
    const value = await addTeam(data);
    if (value == 200) {
      setSuccessMessage(`Team ${teamName} was added successfully`);
    }
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
        <Button variant="contained" fullWidth onClick={addTeamWithMembers}>
          Add
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

function NewTeam() {
  const contributors = useSelector((state) => state.contributors);
  const dispatch = useDispatch();
  const params = useParams();
  const [checkList, setCheckList] = React.useState({});
  React.useEffect(() => {
    dispatch(fetchContributors({ projectId: params.id }));
  }, [dispatch]);

  React.useEffect(() => {
    let list = {};
    contributors.forEach((cont) => {
      list[cont._id] = false;
    });
    setCheckList(list);
  }, [contributors]);

  const handleCheckChange = (id) => (event) => {
    setCheckList({ ...checkList, [id]: event.target.checked });
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header HandleMobileClose={HandleMobileClose} />
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
              New Team
            </Typography>
          </Box>
          <NewTeamDetails checkList={checkList} />
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
              <Grid container paddingX={5} marginY={1} key={contributor._id}>
                <Grid item container alignItems="center" xs={10}>
                  <Avatar sx={{ mr: 2 }} />
                  <Typography variant="body1">{`${contributor.firstName} ${contributor.lastName}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Checkbox
                    checked={checkList[contributor._id]}
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

export default NewTeam;
