import { Divider, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Box } from "@mui/system";

function Footer() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Divider sx={{ m: 10, mb: 2, mt: 1 }} />
        <Box
          sx={{
            display: "flex",
            mb: 2,
            justifyContent: "space-between",
            pr: "10%",
            pl: "10%",
          }}
        >
          <Typography sx={{ color: "gray", mr: 2 }}>
            © 2021 An-Najah National University - Graduation Project
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "gray", mr: 1 }}>
              Social Media Links
            </Typography>
            <TwitterIcon sx={{ color: "gray", mr: 1 }} />
            <FacebookIcon sx={{ color: "gray" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
