import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";

// to be changed, placeholder
const chips = ["Frontend Team", "Backend Team", "Design Team"];

function ProjectContributor() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid
        container
        sx={{
          p: 2,
          px: 5,
          //   display: "flex",
          //   alignItems: "center",
          //   "& > *": {
          //     ml: 2,
          //   },
          "&:hover": {
            backgroundColor: "#eee",
          },
        }}
        rowGap={2}
      >
        <Grid item container alignItems="center" xs={12} md={6}>
          <Avatar />
          <Typography variant="body1" sx={{ ml: 2, width: "50%" }}>
            User 1
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          sx={{
            "& > .MuiChip-root:not(:first-child)": {
              ml: 1,
            },
          }}
        >
          {chips.map((chip) => {
            if (Math.random() > 0.5)
              return <Chip label={chip} variant="outlined"></Chip>;
          })}
          <Chip label="+2"></Chip>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ProfileIcon sx={{ color: "gray", mr: "4px" }} />
              Open Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <DeleteIcon sx={{ color: "red", opacity: "50%", mr: "4px" }} />
              <Typography sx={{ color: "red" }}>Remove User</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}

export default ProjectContributor;
