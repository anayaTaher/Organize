import { Grid, Typography, Button, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import BannerImage from "../assets/images/banner.svg";
import {useContext} from "react"
import {AuthContext} from "./auth"

const SignUpButton = styled(Button)({
  backgroundColor: "white",
  color: "lightseagreen",
  "&:hover": {
    backgroundColor: "#ddd",
  },
  width: "150px",
});


const LogInButton = styled(Button)({
  borderColor: "white",
  color: "white",
  "&:hover": {
    backgroundColor: "#fff",
    color: "lightseagreen",
  },
  width: "150px",
});

function Banner() {
  const {user} = useContext(AuthContext)
  
  return (
    <Grid
      container
      backgroundColor="lightseagreen"
      gap={2}
      justifyContent="center"
      sx={{ p: 2 }}
    >
      <Grid
        item
        container
        xs={12}
        md={5}
        direction="column"
        justifyContent="center"
        sx={{ alignItems: { xs: "center", md: "flex-start" } }}
      >
        <Grid item>
          <Typography variant="h2" color="white" sx={{ fontWeight: "bold" }}>
            Organize Your Way!
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            color="white"
            sx={{
              display: { xs: "none", md: "block" },
              opacity: "50%",
              fontWeight: 100,
            }}
          >
            Organize is an application that aims to organize your projects in a
            better way!
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{
              display: { xs: "block", md: "none" },
              opacity: "50%",
              fontWeight: 100,
            }}
          >
            Organize is an application that aims to organize your projects in a
            better way!
          </Typography>
        </Grid>
        <Grid
          item
          container
          sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
        >
          {!user&&<Grid item>
            <Link href="/signup">
              <SignUpButton
                disableElevation
                variant="contained"
                size="large"
                sx={{ mr: 2 }}
              >
                Sign Up
              </SignUpButton>
            </Link>
          </Grid>}
          {!user&&<Grid item>
            <Link href="/login">
              <LogInButton disableElevation variant="outlined" size="large">
                Log In
              </LogInButton>
            </Link>
          </Grid>}
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={5}
        alignItems="center"
        justifyContent="center"
      >
        <img src={BannerImage} alt="teamwork presentation" width="80%" />
      </Grid>
    </Grid>
  );
}

export default Banner;
