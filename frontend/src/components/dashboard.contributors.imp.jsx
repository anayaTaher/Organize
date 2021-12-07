import {
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TeamIcon from "@mui/icons-material/Person";
import ProjectContributor from "./dashboard.contributor.projectContributor";

function ContributorsImp() {
  const [team, setTeam] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const handleSelectTeamChange = (event) => {
    setTeam(event.target.value);
  };
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const cont = [];
  for (let i = 0; i < 20; i++) {
    cont.push(<ProjectContributor />);
  }

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
        {cont}
      </Box>
    </>
  );
}

export default ContributorsImp;
