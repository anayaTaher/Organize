import {
  Button,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TeamIcon from "@mui/icons-material/Person";
import ProjectContributor from "./dashboard.contributor.projectContributor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addContributor,
  fetchContributors,
} from "../reducers/actions/contributors";

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
  const [team, setTeam] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
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
        }}
      >
        <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
          Project Contributors
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="body1" sx={{ flexGrow: 1, ml: 5 }}>
            40 Contributors
          </Typography>
          <Button variant="contained" sx={{ mr: 5 }} onClick={handleModalOpen}>
            New Member
          </Button>
          <BoxModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
          <FormControl sx={{ width: 150, mr: 5 }}>
            <InputLabel id="team-select">Select Team</InputLabel>
            <Select
              onChange={handleSelectTeamChange}
              value={team}
              label="Select Team"
              labelId="team-select"
              startAdornment={<TeamIcon />}
            >
              <MenuItem value="Backend Team">Backend Team</MenuItem>
              <MenuItem value="Design Team">Design Team</MenuItem>
              <MenuItem value="Frontend Team">Frontend Team</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mr: 5 }}>
            <InputLabel htmlFor="search-teams">Search Members</InputLabel>
            <OutlinedInput
              id="search-teams"
              label="Search Members"
              value={searchValue}
              onChange={handleSearchValueChange}
              startAdornment={<SearchIcon color="inherit" />}
            />
          </FormControl>
        </Box>
        <Divider sx={{ m: 2 }} />
        <Box
          sx={{
            width: "100%",
            p: 2,
            px: 5,
            display: "flex",
            alignItems: "center",
            "& > *": {
              ml: 2,
            },
            "& > .MuiChip-root": {
              ml: 1,
            },
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Typography variant="h6" sx={{ ml: 2, width: "54%" }}>
            Team Member
          </Typography>
        </Box>
        {contributors.map((contributor) => {
          return (
            <ProjectContributor
              key={contributor._id}
              id={contributor._id}
              firstName={contributor.firstName}
              lastName={contributor.lastName}
              teams={contributor.teams}
            />
          );
        })}
      </Box>
    </>
  );
}

export default ContributorsImp;
